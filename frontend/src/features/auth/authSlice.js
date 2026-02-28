import { createSlice } from '@reduxjs/toolkit';

import { login, signup, fetchCurrentUser } from './authThunk.js';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.token = action.payload.token;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.token = action.payload.token;
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;

            if (
                action.payload?.includes('expired') ||
                action.payload.includes('Invalid token')
            ) {
                state.token = null;
                localStorage.removeItem('token');
            }
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer