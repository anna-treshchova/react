import { createSlice } from '@reduxjs/toolkit';

import { getDestinations } from '../thunks/destinationsThunk.js';

const destinationsSlice = createSlice({
    name: 'destinations',
    initialState: {
        selectedCity: null,
        searchQuery: '',
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDestinations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDestinations.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getDestinations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { setSelectedCity, setSearchQuery } = destinationsSlice.actions;

export default destinationsSlice.reducer;