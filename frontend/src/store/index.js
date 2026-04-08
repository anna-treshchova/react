import { configureStore } from '@reduxjs/toolkit';

import { destinationsReducer } from '@/entities/destinations';
import { hotelsReducer } from '@/features/hotels';

const store = configureStore({
   reducer: {
       destinations: destinationsReducer,
       hotels: hotelsReducer,
   }
})

export default store;