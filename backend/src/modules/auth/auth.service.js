import crypto from 'crypto';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import { AUTH_CONFIG } from '#config/auth.js'

import { generateAccessToken, verifyAccessToken } from '#shared/token/index.js';
import { sendMail } from '#shared/mailer/index.js'
import { AppError, ERROR_CODES } from '#shared/errors/index.js';

import { findUserByEmail, createUser } from '#modules/users/users.model.js';

import * as model from './auth.model.js'
import * as template from './auth.template.js'

dayjs.extend(utc);
dayjs.extend(timezone);

const {
    request: REQUEST_ERRORS,
    verify: VERIFY_ERRORS,
    token: TOKEN_ERRORS
} = ERROR_CODES.auth

export const checkThrottle = async (email) => {
    const record = await model.findVerification(email);
    if (!record) return;

    const now = Date.now();
    const createdTime = new Date(record.createdAt).getTime();
    const timePassed = now - createdTime;

    const isThrottled = timePassed < AUTH_CONFIG.otp.resendThrottleMs;

    if (isThrottled) {
        const retryAfterMs = AUTH_CONFIG.otp.resendThrottleMs - timePassed;

        throw new AppError(
            REQUEST_ERRORS.CODE_RESEND_DELAY,
            {
                verification: {
                    email,
                    expiresInMs: new Date(record.expiresAt).getTime() - Date.now(),
                },
                retryAfterMs
            }
        )
    }
}

export const validateCode = async (email, code) => {
    const record = await model.findVerification(email)

    if (!record) {
        throw new AppError(ERROR_CODES.system.RESOURCE_NOT_FOUND);
    }

    const now = Date.now();
    const expiresTime = new Date(record.expiresAt).getTime();

    if (now > expiresTime) {
        await model.deleteVerification(email);
        throw new AppError(VERIFY_ERRORS.CODE_EXPIRED)
    }

    if (code !== String(record.code)) {
        const attempts = await model.incrementVerificationAttempts(record);

        if (attempts >= AUTH_CONFIG.otp.maxAttempts) {
            await model.deleteVerification(email);
            throw new AppError(VERIFY_ERRORS.TOO_MANY_ATTEMPTS)
        }

        throw new AppError(VERIFY_ERRORS.INVALID_CODE)
    }

    await model.deleteVerification(email);
}

export const createVerification = async (email) => {
    const expiresAt = new Date(Date.now() + AUTH_CONFIG.otp.expiresInMs).toISOString()
    const code = crypto.randomInt(100000, 1000000).toString();

    return await model.createVerification(email, { code, expiresAt });
}

export const sendVerificationCode = async (email, timezone, is12Hour) => {
    await checkThrottle(email);

    const newVerification = await createVerification(email);

    try {
        const dateFormat = is12Hour ? 'YYYY-MM-DD hh:mm:ss A' : 'YYYY-MM-DD HH:mm:ss';
        const date = dayjs().tz(timezone || 'UTC').format(dateFormat);

        const { subject, html } = template.renderOtpMail(newVerification.code, date)
        await sendMail({ to: email, subject, html });

        return newVerification;

    } catch (mailError) {
        await model.deleteVerification(email)
        throw mailError;
    }
}

const getOrCreateUser = async (email) => {
    let user = await findUserByEmail(email)

    if (!user) {
        user = await createUser(email);
    }
    return user;
}

export const authenticateUser = async (email) => {
    const user = await getOrCreateUser(email);
    return generateAccessToken({ id: user.id, role: user.role });
}

export const authenticateToken = async (token) => {
    const isBlacklisted = await model.findBlacklistedToken(token);

    if (isBlacklisted) {
        throw new AppError(TOKEN_ERRORS.TOKEN_BLACKLISTED)
    }

    const { payload, error } = verifyAccessToken(token);

    if (error) {
        throw new AppError(error)
    }

    return payload;
}

export const blacklistToken = async (token, user) => {
    const expiresAtMs = user.exp * 1000;
    await model.createBlacklistedToken(token, expiresAtMs);
}

