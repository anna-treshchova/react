import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:4000';

export const getProfileData = createAsyncThunk(
    'profile/getProfileData',
    async (_, { rejectWithValue} ) => {
        try {
            const res = await fetch(`${API_URL}/cv/profile`);
            if (!res.ok) {
                throw new Error(`Failed to get profile info`);
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);

        }
    }
)