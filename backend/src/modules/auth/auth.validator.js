import { AppError, ERROR_CODES } from '#shared/errors/index.js';
import { EMAIL_REGEX } from '#shared/validation/index.js';

const {
    request: REQUEST_ERRORS,
    verify: VERIFY_ERRORS,
} = ERROR_CODES.auth;

export const validateEmail = (body) => {
    const email = body.email?.trim().toLowerCase();

    if (!email) {
        throw new AppError(REQUEST_ERRORS.EMAIL_REQUIRED.code)
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new AppError(REQUEST_ERRORS.INVALID_EMAIL.code);
    }

    return { ...body, email };
}

export const validateEmailAndCode = (body) => {
    const email = body.email?.trim().toLowerCase();
    const code = body.code?.trim();

    if (!email || !code) {
        throw new AppError(VERIFY_ERRORS.MISSING_FIELDS.code);
    }
    return { email, code };
}


