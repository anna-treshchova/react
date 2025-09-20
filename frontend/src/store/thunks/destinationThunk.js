import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:4000';

export const getDestinations = createAsyncThunk(
    'destinations/getDestinations',
    async (_,  { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/destinations`)

            if (!res.ok) {
                throw new Error('Failed to get destinations');
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    })