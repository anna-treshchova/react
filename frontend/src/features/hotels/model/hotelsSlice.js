import { createSlice } from '@reduxjs/toolkit';

import { fetchHotels, toggleWishlist } from './hotelsThunk.js';

const initialState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
}

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.items = [];
            })
            .addCase(toggleWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                state.loading = false;
                const updatedHotel = action.payload;

                state.items = state.items.map(hotel =>
                    hotel.id === updatedHotel.id ? updatedHotel : hotel
                );
            })
            .addCase(toggleWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default hotelsSlice.reducer;