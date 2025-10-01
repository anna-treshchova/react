import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000';

export const getDestinations = createAsyncThunk(
    'destinations/getDestinations',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/destinations`);
            if (!res.ok) {
                throw new Error('Failed to fetch destinations');
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
