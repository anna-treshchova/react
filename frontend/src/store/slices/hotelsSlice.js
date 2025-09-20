import { createSlice } from '@reduxjs/toolkit';

import { getHotels } from '../thunks/hotelsThunk.js';

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHotels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getHotels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default hotelsSlice.reducer;