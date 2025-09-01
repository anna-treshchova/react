import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/counterSlice';
import learningReducer from './slices/learningSlice';
import postsReducer from './slices/postsSlice';

import logger from './middlewares/logger'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        learning: learningReducer,
        posts: postsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

    // middleware: (getDefaultMiddleware) => {
    //     return [logger1, ...getDefaultMiddleware(), logger2]
    // }

});

export default store;



//Функція getDefaultMiddleware повертає масив вбудованих middleware, які React Toolkit підключає автоматично