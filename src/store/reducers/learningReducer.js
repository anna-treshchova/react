import { ADD_TOPIC, DELETE_TOPIC, SET_FILTER, UPDATE_TOPIC_STATUS } from '../actions/actionTypes';

const initialState = {
    topics: [],
    filter: 'all'
};

const learningReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOPIC :
            return {
                ...state,
                topics: [...state.topics, action.payload]
            }
        case DELETE_TOPIC:
            return {
                ...state,
                topics: state.topics.filter(topic => topic.id !== action.payload)
            }
        case UPDATE_TOPIC_STATUS:
            return {
                ...state,
                topics: state.topics.map(topic =>
                    topic.id === action.payload.id ? {...topic, status: action.payload.newStatus} : topic)
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        default: return state;
    }
}

export default learningReducer;