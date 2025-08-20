import { v4 as uuidv4 } from 'uuid';

import { ADD_TOPIC, DELETE_TOPIC, UPDATE_TOPIC_STATUS, SET_FILTER } from './actionTypes';

//Action creators

export const addTopic = (title, description) => {
    return {
        type: ADD_TOPIC,
        payload: {
            id:  uuidv4(),
            title,
            description,
            status: 'not-started'
        }
    }
}

export const deleteTopic = id => ({type: DELETE_TOPIC, payload: id});

export const updateTopicStatus = (id, newStatus) => {
    return {
        type: UPDATE_TOPIC_STATUS,
        payload: {id, newStatus}
    }
}

export const setFilter = filter => ({type: SET_FILTER, payload: filter});
