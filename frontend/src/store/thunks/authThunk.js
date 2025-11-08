import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN;
const SIGNUP_URL = import.meta.env.VITE_SIGNUP;
const AUTH_ME_URL = import.meta.env.VITE_AUTH_ME;

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${LOGIN_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            localStorage.setItem('token', data.token);

            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${SIGNUP_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to sign up');
            }

            localStorage.setItem('token', data.token);

            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        if (!token) return rejectWithValue('No token found');

        try {
            const res = await fetch(`${BASE_URL}${AUTH_ME_URL}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch user');
            }

            return data;
        } catch(err) {
            return rejectWithValue(err.message);
        }
    }
)