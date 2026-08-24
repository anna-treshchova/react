import { ALLOWED_ERRORS_BY_STEP, ERROR_CODES, ERROR_MESSAGES } from '../constants';

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectHasToken = (state) => !!state.auth.accessToken;

export const selectAuthError = (state) => state.auth.error;
export const selectVerification = (state) => state.auth.verification;
export const selectCanResendAt = (state) => state.auth.canResendAt;

export const selectVerificationEmail = (state) => state.auth.verification?.email;
export const selectVerificationExpiresAt = (state) => state.auth.verification?.expiresAt;

export const selectErrorMessageByStep = (state, step) => {
    const error = selectAuthError(state);

    if (!error) return null;

    const stepKey = step.toUpperCase()
    const allowedError = ALLOWED_ERRORS_BY_STEP[stepKey];
    const isAllowed = allowedError?.includes(error);

    if (!isAllowed) return null;

    return ERROR_MESSAGES[error] || ERROR_MESSAGES[ERROR_CODES.DEFAULT];
}


