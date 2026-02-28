import { configureStore } from '@reduxjs/toolkit';

import { eventsReducer } from '@/features/events'
import { authReducer } from '@/features/auth';

const store = configureStore({
    reducer: {
        events: eventsReducer,
        auth: authReducer,
    }
})

export default store;
