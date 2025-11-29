import { createAsyncThunk } from '@reduxjs/toolkit';

const {
    VITE_BASE_URL: BASE_URL,
    VITE_DESTINATIONS: DESTINATIONS_URL,
} = import.meta.env;

export const getDestinations = createAsyncThunk(
    'destinations/getDestinations',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${DESTINATIONS_URL}`);
            if (!res.ok) {
                throw new Error('Failed to fetch destinations');
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
