import { v4 as uuidv4 } from 'uuid';

import { ADD_TODO } from './actionTypes';

export const addTodo = (todoText) => {
    return {
        type: ADD_TODO,
        payload: {
            id: uuidv4(),
            text: todoText
        }
    }
}