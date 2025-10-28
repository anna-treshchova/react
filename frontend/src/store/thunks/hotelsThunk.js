import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000';

export const getHotelsPage = createAsyncThunk(
    'hotels/getHotelsPage',
    async (page, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/hotels?page=${page}&limit=18`);

            if (!res.ok) {
                const errBody = await res.json();
                throw new Error(errBody.message || 'Failed to get hotels page');
            }

            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const getFilteredHotelsPage = createAsyncThunk(
    'hotels/getFilteredHotelsPage',
    async ({ destinationId, guests, pets, page }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/hotels?page=${page}&limit=18`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ destinationId, guests, pets })
            });

            if (!res.ok) {
                const errBody = await res.json();
                throw new Error(errBody.message || 'Failed to get hotels');
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const toggleFavorite = createAsyncThunk(
    'hotels/toggleFavorite',
    async ({ id, favorite }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/hotels/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ favorite })
            });

            if (!res.ok) {
                const res = await res.json();
                throw new Error(res.message || 'Failed to toggle favorite');
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

