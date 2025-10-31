import { createSlice } from '@reduxjs/toolkit';
import { fetchHotelsPage, toggleFavorite } from '../thunks/hotelsThunk.js';

const initialState = {
    items: [],
    total: 0,
    page: 1,
    loading: false,
    error: null,
}

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotelsPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHotelsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.page = action.meta.arg.page;
            })
            .addCase(fetchHotelsPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.items = [];
            })

            .addCase(toggleFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.loading = false;

                const updatedHotel = action.payload;

                state.items = state.items.map(hotel =>
                    hotel.id === updatedHotel.id ? updatedHotel : hotel
                );
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default hotelsSlice.reducer;
