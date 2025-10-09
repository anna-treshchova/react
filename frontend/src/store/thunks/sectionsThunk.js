import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:4000';

export const getSection = createAsyncThunk(
    'sections/getSection',
    async (section, { rejectWithValue} ) => {
        try {
            const res = await fetch(`${API_URL}/cv/sections/${section}`);
            if (!res.ok) {
                throw new Error(`Failed to get ${section}`);
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);

        }
    }
)

export const getAllSections = createAsyncThunk(
    'sections/getAllSections',
    async (_, { rejectWithValue} ) => {
        try {
            const res = await fetch(`${API_URL}/cv/sections`);
            if (!res.ok) {
                throw new Error(`Failed to get sections`);
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);

        }
    }
)