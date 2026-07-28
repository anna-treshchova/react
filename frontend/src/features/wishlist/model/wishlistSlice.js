import { createSlice } from '@reduxjs/toolkit';
import { toggleWishlist } from './wishlistThunk.js';

const initialState = {
    items: [],
    total: 0,
    status: 'idle', // 'idle', 'loading'
    error: null,
}

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(toggleWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedHotel = action.payload;

                state.items = state.items.map(hotel =>
                    hotel.id === updatedHotel.id ? updatedHotel : hotel
                );
            })
            .addCase(toggleWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default hotelsSlice.reducer;