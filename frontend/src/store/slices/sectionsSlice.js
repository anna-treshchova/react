import { createSlice } from '@reduxjs/toolkit';
import { getAllSections, getSection } from '../thunks/sectionsThunk.js';

const initialState = {
    skills: { items: [], show: false, loading: false, error: null },
    stack: { items: [], show: false, loading: false, error: null },
    extra: { items: [], show: false, loading: false, error: null },
    contacts: { items: [], show: false, loading: false, error: null },
    courses: { items: [], show: false, loading: false, error: null },
    previousPositions: { items: [], show: false, loading: false, error: null },
    languages: { items: [], show: false, loading: false, error: null },
}

const sectionsSlice = createSlice({
    name: 'sections',
    initialState: initialState,
    reducers: {
        toggleShow: (state, action) => {
            const section = action.payload;
            state[section].show = !state[section].show;
        },
        toggleAllSections: (state) => {
            const allOpen = Object.keys(state).every(key => state[key].show === true);
            for (const key in state) {
                state[key].show = !allOpen;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSections.pending, (state) => {
                for (const key in state) {
                    state[key].loading = true;
                    state[key].error = null;
                }
            })
            .addCase(getAllSections.fulfilled, (state, action) => {
                for (const key in action.payload) {
                    if (state[key]) {
                        state[key] = {
                            ...state[key],
                            items: action.payload[key],
                            loading: false,
                            show: true,
                        };
                    }
                }
            })
            .addCase(getAllSections.rejected, (state, action) => {
                for (const key in state) {
                    state[key].loading = false;
                    state[key].error = action.payload;
                }
            })
            .addCase(getSection.pending, (state, action) => {
                const section = action.meta.arg;
                state[section].loading = true;
                state[section].error = null;
            })
            .addCase(getSection.fulfilled, (state, action) => {
                const section = action.meta.arg;
                state[section].loading = false;
                state[section].items = action.payload;
                state[section].show = true;

            })
            .addCase(getSection.rejected, (state, action) => {
                const section = action.meta.arg;
                state[section].loading = false;
                state[section].error = action.payload;
            })
    }
})

export const { toggleShow, toggleAllSections } = sectionsSlice.actions;
export default sectionsSlice.reducer;