import { configureStore } from '@reduxjs/toolkit';

import destinationsReducer from './slices/DestinationsSlice.js';
import searchReducer from './slices/SearchSlice.js';
import filtersReducer from './slices/filtersSlice.js';

const store = configureStore({
   reducer: {
       destinations: destinationsReducer,
       search: searchReducer,
       filters: filtersReducer,
   }
})

export default store;