import { createSlice } from '@reduxjs/toolkit';

import { getEvents } from '../thunks/eventThunk.js';

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export default eventSlice.reducer