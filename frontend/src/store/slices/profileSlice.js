import { createSlice } from '@reduxjs/toolkit';
import { getProfileData } from '../thunks/profileThunk.js';

const initialState = {
    data: null,
    loading: false,
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProfileData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfileData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getProfileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default profileSlice.reducer;