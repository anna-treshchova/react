import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:4000'; //.env file

export const getEvents = createAsyncThunk(
    'events/getEvents',
    async ({ destinationId, query }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/search`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ destinationId, query })
            })

            if (!res.ok) {
                const err =  await res.json();
                throw new Error(err.message || 'Failed to fetch events.');
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }

    })