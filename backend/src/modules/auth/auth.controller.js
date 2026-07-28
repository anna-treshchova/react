import { AUTH_CONFIG } from '#config/auth.js';
import * as service from './auth.service.js';

export const sendCode = async (req, res, next) => {
    const { email, timezone, is12Hour } = req.body;

    try {
        const verification = await service.sendVerificationCode(email, timezone, is12Hour);

        res.status(201).json({
            verification: {
                email: verification.email,
                expiresInMs: AUTH_CONFIG.otp.expiresInMs,
            },
            retryAfterMs: AUTH_CONFIG.otp.resendThrottleMs
        });
    } catch (err) {
        err.context = { email }
        next(err);
    }
}

export const verifyCode = async (req, res, next) => {
    const { email, code } = req.body;

    try {
        await service.validateCode(email, code);

        const accessToken = await service.authenticateUser(email);

        res.status(200).json({ accessToken });
    } catch (err) {
        err.context = { email };
        next(err)
    }
}

export const logout = async (req, res, next) => {
    const { token, user } = req;

    try {
        await service.blacklistToken(token, user);
        res.sendStatus(200);
    } catch (err) {
        err.context = { ...err.context, token }
        next(err);
    }
}

