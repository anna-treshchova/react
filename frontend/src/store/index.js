import { configureStore } from '@reduxjs/toolkit';

import hotelsReducer from './slices/hotelsSlice.js'

const store = configureStore({
   reducer: {
       hotels: hotelsReducer
   }
})

export default store;