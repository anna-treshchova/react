import { configureStore } from '@reduxjs/toolkit';

import profileReducer from './slices/profileSlice.js'
import sectionsReducer from './slices/sectionsSlice.js';
import interviewReducer from './slices/interviewSlice.js';

const store =  configureStore({
    reducer: {
        profile: profileReducer,
        sections: sectionsReducer,
        interview: interviewReducer,
    }
})
export default store;