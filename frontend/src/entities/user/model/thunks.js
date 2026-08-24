import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_CODES } from '@/shared/constants/error-codes';

const {
    VITE_BASE_URL: BASE_URL,
    VITE_USERS_ME: USERS_ME_URL
} = import.meta.env;

export const fetchMe = createAsyncThunk(
    'user/fetchMe',
    async (accessToken, { rejectWithValue }) => {
        try {
            if (!accessToken) {
                return rejectWithValue ({ shouldClearToken: false });
            }

            const res = await fetch(`${BASE_URL}${USERS_ME_URL}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            })

            const data = res.headers.get('content-type')?.includes('application/json')
                ? await res.json()
                : null;

            if (!res.ok) {
                const errorCode = data?.errorCode || ERROR_CODES.DEFAULT;

                const error = new Error('Profile auto-auth request failed', {
                    cause: {
                        code: errorCode,
                        status: res.status,
                        url: res.url
                    }
                });

                console.error('[fetchMe Thunk Error]: ', error)

                const shouldClearToken = res.status === 401;

                return rejectWithValue ({ shouldClearToken });
            }

            return data;
        } catch(err) {
            console.error('[fetchMe Network Error]: ', err);
            return rejectWithValue({ shouldClearToken: false });
        }
    }
)