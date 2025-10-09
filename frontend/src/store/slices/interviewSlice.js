import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   scheduled: null,
}

const interviewSlice = createSlice({
    name: 'interview',
    initialState: initialState,
    reducers: {
        setScheduled: (state, action) => {
            state.scheduled = action.payload;
        }
    },
})

export const { setScheduled} = interviewSlice.actions;
export default interviewSlice.reducer;