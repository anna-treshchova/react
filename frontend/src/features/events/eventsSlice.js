import { createSlice } from '@reduxjs/toolkit';
import { getDestinations, getEvents } from './eventsThunk.js';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        destinations: [],
        selectedDestination: null,
        searchQuery: '',
        loading: {
            destinations: false,
            events: false,
        },
        errors: {
            destinations: null,
            events: null,
        },
    },
    reducers: {
        setSelectedDestination: (state, action) => {
            state.selectedDestination = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDestinations.pending, (state) => {
                state.loading.destinations = true;
                state.errors.destinations = null;
            })
            .addCase(getDestinations.fulfilled, (state, action) => {
                state.loading.destinations = false;
                state.destinations = action.payload;
            })
            .addCase(getDestinations.rejected, (state, action) => {
                state.loading.destinations = false;
                state.errors.destinations = action.payload;
            })
            .addCase(getEvents.pending, (state) => {
                state.loading.events = true;
                state.errors.events = null;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.events = action.payload;
                state.loading.events = false;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.errors.events = action.payload;
                state.loading.events = false;
            })
    }
})

export const { setSelectedDestination, setSearchQuery } = eventsSlice.actions;
export default eventsSlice.reducer;




