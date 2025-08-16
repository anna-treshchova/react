import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT, RESET } from './actionTypes';

//Action Creators:

export const increment = () => ({type: INCREMENT});

export const decrement = () => ({type: DECREMENT});

export const incrementByAmount = (amount) => ({type: INCREMENT_BY_AMOUNT, payload: amount});

export const reset = () => ({type: RESET});