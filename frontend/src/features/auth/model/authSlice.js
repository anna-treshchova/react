import { createSlice } from '@reduxjs/toolkit';

import { loadFromStorage } from '@/shared/lib/storage.js';

import { ERROR_CODES, SEND_CODE_ERROR_MAP, VERIFY_CODE_ERROR_MAP } from '../constants';
import { isFetchError, getFetchErrorCode } from '../lib';
import { authApi } from './authApi.js';

const {
    MISSING_FIELDS,
    RESOURCE_NOT_FOUND,
    TOO_MANY_ATTEMPTS
} = ERROR_CODES;

const initialState = {
    verification: null,
    canResendAt: 0,
    accessToken: null,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ...initialState,
        accessToken: loadFromStorage('access_token'),
    },
    reducers: {
        setError: (state, action) => {
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
                };

                state.canResendAt = Date.now() + retryAfterMs;
            })
            .addMatcher(authApi.endpoints.sendCode.matchRejected, (state, action) => {
                const { status, data } = action.payload || {};

                if (isFetchError(status)) {
                    state.error = getFetchErrorCode();
                    return;
                }

                const {
                    errorCode = ERROR_CODES.DEFAULT,
                    retryAfterMs,
                    verification,
                } = data || {};

                state.error = SEND_CODE_ERROR_MAP[errorCode] || errorCode;

                if (retryAfterMs) {
                    state.canResendAt = Date.now() + retryAfterMs
                }

                if (verification) {
                   state.verification = {
                       email: verification.email,
                       expiresAt: Date.now() + verification.expiresInMs,
                   };
                }
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
                const { status, data } = action.payload || {};

                if (isFetchError(status)) {
                    state.error = getFetchErrorCode();
                    return;
                }

                const errorCode = data?.errorCode || ERROR_CODES.DEFAULT;

                state.error = VERIFY_CODE_ERROR_MAP[errorCode] || errorCode;

                if (errorCode === MISSING_FIELDS || errorCode === RESOURCE_NOT_FOUND) {
                    state.verification = null;
                    state.canResendAt = 0;
                }

                if (errorCode === TOO_MANY_ATTEMPTS && state.verification) {
                    state.verification = {
                        ...state.verification,
                        isAttemptsExceeded: true
                    }
                }
            })

            .addMatcher(
                (action) => {
                    const isUnauthorised = action.type.endsWith('/rejected') && action.payload?.status === 401

                    const isLogoutAction = action.meta?.arg?.endpointName === 'logout' &&
                        (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'));

                    return isUnauthorised || isLogoutAction;
                },
                () => initialState
            )
    }
})

export const { setError } = authSlice.actions;
export default authSlice.reducer;



