import { createSlice } from '@reduxjs/toolkit';

import { getHotels, toggleFavorite } from '../thunks/hotelsThunk.js';

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: {
        items: [],
        dates: [null,  null],
        nightsCount: 2,
        loading: {
            list: false,
            selected: false
        },
        error: {
            list: null,
            selected: null
        }
    },
    reducers: {
        setNightsCount: (state, action) => {
            state.nightsCount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHotels.pending, (state) => {
                state.loading.list = true;
                state.error.list = null;
                state.items = [];
            })
            .addCase(getHotels.fulfilled, (state, action) => {
                state.loading.list = false;
                state.items = action.payload;
            })
            .addCase(getHotels.rejected, (state, action) => {
                state.loading.list = false;
                state.error.list = action.payload;
            })

            .addCase(toggleFavorite.pending, (state) => {
                state.loading.list = true;
                state.error.list = null;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.loading.list = false;

                const updatedHotel = action.payload;

                state.items = state.items.map(hotel =>
                    hotel.id === updatedHotel.id ? updatedHotel : hotel
                );

            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.loading.list = false;
                state.error.list = action.payload;
            })
    }
})

export const { setNightsCount } = hotelsSlice.actions;
export default hotelsSlice.reducer;
