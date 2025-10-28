import { createSlice } from '@reduxjs/toolkit';
import { getHotelsPage, getFilteredHotelsPage, toggleFavorite } from '../thunks/hotelsThunk.js';


const initialState = {
    items: [],
    total: 0,
    page: 1,
    mode: 'all',
    filters: {
        destinationId: null,
        guest: null,
        pets: null,
    },
    dates: [null, null],
    nightsCount: 2,
    loading: false,
    error: null,
}

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: initialState,
    reducers: {
        setNightsCount: (state, action) => {
            state.nightsCount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHotelsPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHotelsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.page = action.meta.arg;
                state.mode = 'all';
            })
            .addCase(getHotelsPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.items = [];
            })

            .addCase(getFilteredHotelsPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFilteredHotelsPage.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.page = action.meta.arg.page;
                state.mode = 'filtered';
                state.filters = {
                    destinationId: action.meta.arg.destinationId,
                    guests: action.meta.arg.guests,
                    pets: action.meta.arg.pets,
                };
            })
            .addCase(getFilteredHotelsPage.rejected, (state, action) => {
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

export const { setNightsCount } = hotelsSlice.actions;
export default hotelsSlice.reducer;
