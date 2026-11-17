import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loadFromStorage } from '@/shared/lib/local-storage';

import { authApi } from '../api/authApi';
import {
    ERROR_CODES,
    SERVER_TO_SEND_CODE_ERROR_MAP,
    SERVER_TO_VERIFY_CODE_ERROR_MAP,
    type ErrorCode
} from '../constants';

import { isAuthResetAction } from './action-matchers';
import type { AuthState } from './types';
import {
    isSendCodeErrorData,
    isVerifyCodeErrorData,
    normalizeRejectedError,
    normalizeErrorCode,
    type SendCodeErrorData,
    type VerifyCodeErrorData,
} from './error-handlers';

const {
    MISSING_FIELDS,
    RESOURCE_NOT_FOUND,
    TOO_MANY_ATTEMPTS,
} = ERROR_CODES;

const initialState: AuthState = {
    verification: null,
    canResendAt: 0,
    accessToken: null,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ...initialState,
        accessToken: loadFromStorage<string>('access_token'),
    },
    reducers: {
        setError: (state, action: PayloadAction<ErrorCode | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.sendCode.matchPending, (state) => {
                state.error = null;
                state.canResendAt = 0;
            })
            .addMatcher(authApi.endpoints.sendCode.matchFulfilled, (state, action) => {
                const { retryAfterMs, verification } = action.payload;

                state.verification = {
                    email: verification.email,
                    expiresAt: Date.now() + verification.expiresInMs,
                    isAttemptsExceeded: false,
                };

                state.canResendAt = Date.now() + retryAfterMs;
            })
            .addMatcher(authApi.endpoints.sendCode.matchRejected, (state, action) => {
               const result = normalizeRejectedError<SendCodeErrorData>(
                   action.payload,
                   isSendCodeErrorData
               );

                if (!result.success) {
                    state.error = result.error;
                    return;
                }

                const { errorCode, retryAfterMs, verification } = result.data;

                state.error = normalizeErrorCode(errorCode, SERVER_TO_SEND_CODE_ERROR_MAP);

                const now = Date.now();

                state.canResendAt = now + retryAfterMs

                state.verification = {
                    email: verification.email,
                    expiresAt: now + verification.expiresInMs,
                    isAttemptsExceeded: false,
                };
            })
            .addMatcher(authApi.endpoints.verifyCode.matchPending, (state) => {
                state.error = null;
            })
            .addMatcher(authApi.endpoints.verifyCode.matchFulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;

                state.verification = null;
                state.canResendAt = 0;
            })
            .addMatcher(authApi.endpoints.verifyCode.matchRejected, (state, action) => {
                const result = normalizeRejectedError<VerifyCodeErrorData>(
                    action.payload,
                    isVerifyCodeErrorData
                )
                if (!result.success) {
                    state.error = result.error;
                    return;
                }

                const errorCode = result.data.errorCode;

                state.error = normalizeErrorCode(errorCode, SERVER_TO_VERIFY_CODE_ERROR_MAP);

                if (errorCode === MISSING_FIELDS || errorCode === RESOURCE_NOT_FOUND) {
                    state.verification = null;
                    state.canResendAt = 0;
                }

                if (errorCode === TOO_MANY_ATTEMPTS && state.verification) {
                    state.verification.isAttemptsExceeded = true;
                }
            })
            .addMatcher(isAuthResetAction, () => initialState)
    }
})

export const { setError } = authSlice.actions;
export default authSlice.reducer;