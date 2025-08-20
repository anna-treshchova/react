import { combineReducers } from 'redux';

import counterReducer from './counterReducer';
import learningReducer from './learningReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    learning: learningReducer
})

export default rootReducer;
