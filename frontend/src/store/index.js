import {configureStore } from '@reduxjs/toolkit';

import destinationsReducer from './slices/destinationsSlice.js'
import eventsReducer from './slices/eventsSlice.js'
import authReducer from './slices/authSlice.js'

const store = configureStore({
    reducer: {
        destinations: destinationsReducer,
        events: eventsReducer,
        auth: authReducer,
    }
})

export default store;
