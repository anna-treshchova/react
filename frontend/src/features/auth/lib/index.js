import { EMAIL_REGEX, ERROR_CODES, ERROR_MESSAGES } from '../constants';

export const validateEmail = (value) => {
    const trimmedEmail = value?.trim() || '';

    if (!trimmedEmail) {
        return { error: ERROR_MESSAGES.EMAIL_REQUIRED, email: '' };
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return { error: ERROR_MESSAGES.INVALID_EMAIL, email: '' };
    }

    return { error: '', email: trimmedEmail };
}

export const isFetchError = (status) => status === 'FETCH_ERROR';

export const getFetchErrorCode = () => {
    return !window.navigator.onLine
        ? ERROR_CODES.NETWORK_ERROR
        : ERROR_CODES.SERVER_UNREACHABLE;
}