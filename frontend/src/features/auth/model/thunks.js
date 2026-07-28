import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_CODES } from '../constants';

const {
    VITE_BASE_URL: BASE_URL,
    VITE_AUTH_SEND_CODE: SEND_CODE_URL,
    VITE_AUTH_VERIFY_CODE: VERIFY_CODE_URL,
    VITE_AUTH_LOGOUT: LOGOUT_URL,
} = import.meta.env;

import { selectAccessToken } from '../model';

export const sendCode = createAsyncThunk(
    'auth/sendCode',
    async (email, { rejectWithValue }) => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const is12Hour = !!new Date().toLocaleString().match(/am|pm/i);

        try {
            const res = await fetch(`${BASE_URL}${SEND_CODE_URL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    timezone,
                    is12Hour,
                })
            })

            const data = res.headers.get('content-type')?.includes('application/json')
                ? await res.json()
                : null;

            if (!res.ok) {
                const { errorCode, details } = data || {};

                const errorData = {
                    errorCode: errorCode || ERROR_CODES.DEFAULT,
                    retryAfterMs: details?.retryAfterMs ?? 0,
                }

                return rejectWithValue(errorData)
            }

            return data;
        } catch(err) {
            if (err.name === 'TypeError') {
                const errorCode = !window.navigator.onLine
                    ? ERROR_CODES.NETWORK_ERROR
                    : ERROR_CODES.SERVER_UNREACHABLE

                return rejectWithValue({ errorCode });
            }

            return rejectWithValue({ errorCode: ERROR_CODES.DEFAULT });
        }
    }
)

export const verifyCode = createAsyncThunk(
    'auth/verifyCode',
    async ({ email, code }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${VERIFY_CODE_URL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    code
                })
            })

            const data = res.headers.get('content-type')?.includes('application/json')
                ? await res.json()
                : null;

            if (!res.ok) {
               return rejectWithValue({ errorCode: data?.errorCode || ERROR_CODES.DEFAULT });
            }

            localStorage.setItem('accessToken', data.accessToken);

            return data;
        } catch(err) {
            if (err.name === 'TypeError') {
                const errorCode = !window.navigator.onLine
                    ? ERROR_CODES.NETWORK_ERROR
                    : ERROR_CODES.SERVER_UNREACHABLE

                return rejectWithValue({ errorCode });
            }

            return rejectWithValue({ errorCode: ERROR_CODES.DEFAULT });
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { getState }) => {
        const accessToken = selectAccessToken(getState())

        localStorage.removeItem('accessToken');

        try {
            const res = await fetch(`${BASE_URL}${LOGOUT_URL}`, {
                method: 'POST',
                headers: {'Authorization': `Bearer ${accessToken}`}
            });

            if (!res.ok) {
                const errorBody = await res.json().catch(() => ({}))
                const errorCode = errorBody?.errorCode || ERROR_CODES.DEFAULT;

                const error = new Error('Logout request failed', {
                    cause: {
                        code: errorCode,
                        status: res.status,
                        url: res.url
                    }
                });

                console.error('[Logout Thunk Error]: ', error)
            }
            return true;
        } catch(err) {
            console.error('[Logout Network Error]: ', err);
            return true;
        }
    }
)