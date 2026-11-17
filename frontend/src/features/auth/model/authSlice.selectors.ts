import {
    ALLOWED_ERRORS_BY_STEP,
    ERROR_CODES, ERROR_MESSAGES,
    isErrorMessageCode,
    type AuthStep
} from '../constants';

import type { AuthState } from './types';

export interface StateWithAuth {
    auth: AuthState
}

export const selectAccessToken = (state: StateWithAuth) => state.auth.accessToken;
export const selectHasToken = (state: StateWithAuth) => !!state.auth.accessToken;

export const selectAuthError = (state: StateWithAuth) => state.auth.error;
export const selectVerification = (state: StateWithAuth) => state.auth.verification;
export const selectCanResendAt = (state: StateWithAuth) => state.auth.canResendAt;

export const selectVerificationEmail = (state: StateWithAuth) => state.auth.verification?.email;
export const selectVerificationExpiresAt = (state: StateWithAuth) => state.auth.verification?.expiresAt;

type ErrorMessage = typeof ERROR_MESSAGES [keyof typeof ERROR_MESSAGES];

export type ErrorMessageByStep = ErrorMessage | null;

export const selectErrorMessageByStep = (
    state: StateWithAuth,
    step: AuthStep,
): ErrorMessageByStep => {
    const error = selectAuthError(state);

    if (!error) return null;

    const allowedError = ALLOWED_ERRORS_BY_STEP[step];
    const isAllowed = allowedError.some(key => key === error);

    if (!isAllowed) return null;

    return isErrorMessageCode(error)
        ? ERROR_MESSAGES[error]
        : ERROR_MESSAGES[ERROR_CODES.DEFAULT];
}
