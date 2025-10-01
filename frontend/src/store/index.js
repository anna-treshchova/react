import { configureStore } from '@reduxjs/toolkit';

import hotelsReducer from './slices/hotelsSlice.js'
import destinationsReducer from './slices/DestinationsSlice.js'

const store = configureStore({
   reducer: {
       hotels: hotelsReducer,
       destinations: destinationsReducer
   }
})

export default store;