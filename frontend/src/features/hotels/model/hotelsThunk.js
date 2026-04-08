import { createAsyncThunk } from '@reduxjs/toolkit';
import { PAGE_SIZE } from './pagination.constants.js';

const {
    VITE_BASE_URL: BASE_URL,
    VITE_SEARCH: SEARCH_URL,
    VITE_HOTELS: HOTELS_URL
} = import.meta.env;

export const fetchHotels = createAsyncThunk(
    'hotels/fetchHotels',
    async ({ page = 1, destinationId, guests, pets }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({
                page,
                limit: PAGE_SIZE,
            });

            if (destinationId) params.set('destinationId', destinationId);
            if (guests) params.set('guests', guests);
            if (pets) params.set('pets', pets);

            const res = await fetch(`${BASE_URL}${SEARCH_URL}?${params}`);

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

export const toggleWishlist = createAsyncThunk(
    'hotels/toggleWishlist',
    async ({ id, favorite }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${HOTELS_URL}/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ favorite })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to toggle favorite');
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)