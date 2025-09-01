import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topics: JSON.parse(localStorage.getItem('topics')) || [],
    filter: 'all',
    loading: false,
    error: null
};

// GET_TOPICS_PENDING
// GET_TOPICS_FULFILLED
// GET_TOPIC_REJECTED

const learningSlice = createSlice({
    name: 'learning',  //поле name використовується для генерації action types —> slice name/reducer name
    initialState,
    reducers: {
        addTopic: (state, action) => {         // МУТУВАННЯ draft  —>  фігурні дужки {} без return
            state.topics.push(action.payload)  // Редʼюсер мутує draft —> Immer зберігає зміни і сам повертає новий state
        },

        deleteTopic: (state, action) => {
            state.topics = state.topics.filter(topic => topic.id !== action.payload)
        },

        updateTopicStatus: (state, action) => {
            const { id, newStatus } = action.payload;

            state.topics = state.topics.map(topic =>
                topic.id === id ? {...topic, status: newStatus} : topic
            )
        },

        setFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

export const {
    addTopic,
    deleteTopic,
    updateTopicStatus,
    setFilter
} = learningSlice.actions;

export default learningSlice.reducer;