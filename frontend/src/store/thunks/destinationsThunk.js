import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const GET_DESTINATIONS_URL = import.meta.env.VITE_GET_DESTINATIONS;

export const getDestinations = createAsyncThunk(
    'destinations/getDestinations',
    async (_,  { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${GET_DESTINATIONS_URL}`)

            if (!res.ok) {
                throw new Error('Failed to get destinations');
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    })