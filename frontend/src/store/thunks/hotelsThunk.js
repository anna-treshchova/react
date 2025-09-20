import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/';

export const getHotels = createAsyncThunk(
    'hotels/getHotels',
    async ({ destinationId, query }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/search`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ destinationId, query })
            });

            if (!res.ok) {
                const res = await res.json();
                throw new Error(res.message || 'Failed to get hotels');
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)