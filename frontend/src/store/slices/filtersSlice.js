import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    destination: {
        id: null,
        label: null,
    },
    guests: 0,
    pets: 0,
    dates: [null, null],
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        setFilter: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        clearAllFilters: () => initialState,
    }
})

export const { setFilter, clearAllFilters } = filtersSlice.actions;
export default filtersSlice.reducer;