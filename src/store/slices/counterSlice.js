import { createSlice } from '@reduxjs/toolkit';

const initialState = 0

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
      increment: state => state + 1,    // Повертаємо новий state —> Immer не втручається
      decrement: state => state - 1,
      incrementByAmount: (state, action) => state + action.payload,
      reset: () => 0
  }
})

export const {
    increment,
    decrement,
    incrementByAmount,
    reset
} = counterSlice.actions;

export default counterSlice.reducer;

