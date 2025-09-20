import {configureStore } from '@reduxjs/toolkit';

import destinationReducer from './slices/destinationSlice.js'
import eventReducer from './slices/eventSlice.js'
import authReducer from './slices/authSlice.js'

const store = configureStore({
    reducer: {
        destinations: destinationReducer,
        events: eventReducer,
        auth: authReducer,
    }
})

export default store;
