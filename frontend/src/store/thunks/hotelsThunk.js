import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000';

export const getHotels = createAsyncThunk(
    'hotels/getHotels',
    async ({ city, guests, pets }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/hotels`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ city, guests, pets })
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

export const getHotelById = createAsyncThunk(
    'hotels/getHotelById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/hotels/${id}`);

            if (!res.ok) {
                const res = await res.json();
                throw new Error(res.message || 'Hotel not found.');
            }
            return res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

