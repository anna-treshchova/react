import { EMAIL_REGEX, ERROR_MESSAGES } from '../constants';

type ErrorType =
    | ''
    | typeof ERROR_MESSAGES.EMAIL_REQUIRED
    | typeof ERROR_MESSAGES.INVALID_EMAIL;

type ValidateEmailReturn = {
    error: ErrorType;
    email: string;
}

export const validateEmail = (
    email: string
): ValidateEmailReturn => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
        return { error: ERROR_MESSAGES.EMAIL_REQUIRED, email: '' };
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return { error: ERROR_MESSAGES.INVALID_EMAIL, email: '' };
    }

    return { error: '', email: trimmedEmail };
}