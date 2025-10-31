import { configureStore } from '@reduxjs/toolkit';

import destinationsReducer from './slices/DestinationsSlice.js'
import hotelsReducer from './slices/hotelsSlice.js'
import filtersReducer from './slices/filtersSlice.js'

const store = configureStore({
   reducer: {
       hotels: hotelsReducer,
       destinations: destinationsReducer,
       filters: filtersReducer,
   }
})

export default store;