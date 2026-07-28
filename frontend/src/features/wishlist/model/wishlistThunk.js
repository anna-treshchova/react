import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ERROR_CODES } from '@/features/auth/constants';
const { VITE_BASE_URL: BASE_URL, VITE_HOTELS: HOTELS_URL } = import.meta.env;

export const toggleWishlist = createAsyncThunk(
    'hotels/toggleWishlist',
    async ({ id, favorite }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${HOTELS_URL}/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ favorite })
            });

            const data = res.headers.get('content-type')?.includes('application/json')
                ? await res.json()
                : null;

            if (!res.ok) {
                return rejectWithValue({ errorCode: data?.errorCode}); //|| ERROR_CODES.DEFAULT
            }

            return data;
        } catch (err) {
            console.error('[Toggle Wishlist Network Error]: ', err);
            return rejectWithValue(err.message);
        }
    }
)
