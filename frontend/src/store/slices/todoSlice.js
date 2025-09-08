import { createSlice } from '@reduxjs/toolkit';

import {
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo
} from '../thunks/todoThunk'

const initialState = {
    todos: [],
    status: {
        get: 'idle',  // idle | loading | succeeded | failed
        add: 'idle',
        toggle: 'idle',
        delete: 'idle',
    },
    togglingId: null,
    deletingId: null,
    updatingId: null,
    error: {
        get: null,
        add: null,
        toggle: null,
        delete: null,
    }
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllTodos.pending, (state) => {
            state.status.get = 'loading';
            state.error.get = null;
        })
        builder.addCase(getAllTodos.fulfilled, (state, action) => {
            state.status.get = 'succeeded';
            state.todos = action.payload;
        })
        builder.addCase(getAllTodos.rejected, (state, action) => {
            state.status.get = 'failed';
            state.error.get = action.payload;
        })

        builder.addCase(addTodo.pending, (state) => {
            state.status.add = 'loading';
            state.error.add = null;
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.status.add = 'succeeded';
            state.todos.push(action.payload);
        })
        builder.addCase(addTodo.rejected, (state, action) => {
            state.status.add = 'failed';
            state.error.add = action.payload;
        })

        builder.addCase(toggleTodo.pending, (state, action) => { //оптимістичне оновлення
            const { id, checked }  = action.meta.arg;

            state.status.toggle = 'loading';
            state.error.toggle = null;
            state.togglingId = id;

            state.todos = state.todos.map(todo =>
                todo.id === id ?  {...todo,  completed: checked} : todo
            );
        })
        builder.addCase(toggleTodo.fulfilled, (state, action) => {
            state.status.toggle = 'succeeded';

            state.todos = state.todos.map(todo =>
                todo.id === action.payload.id ?  action.payload : todo
            );
        })
        builder.addCase(toggleTodo.rejected, (state, action) => {
            const { id, checked }  = action.meta.arg;

            state.status.toggle = 'failed';
            state.error.toggle = action.payload;
            state.togglingId = null;

            state.todos = state.todos.map(todo =>
                todo.id === id ?  {...todo,  completed: !checked} : todo
            );
        })

        builder.addCase(deleteTodo.pending, (state, action) => {
            state.status.delete = 'loading';
            state.deletingId  = action.meta.arg;
            state.error.delete = null;
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.status.delete = 'succeeded';
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.status.delete = 'failed';

            state.error.delete = action.payload;
        })

        builder.addCase(updateTodo.pending, (state, action) => {
            state.status.update = 'loading';
            state.updatingId  = action.meta.arg.id;
            state.error.update = null;
        })
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            state.status.update = 'succeeded';

            state.todos = state.todos.map(todo =>
                todo.id === action.payload.id ? action.payload : todo
            );
        })
        builder.addCase(updateTodo.rejected, (state, action) => {
            state.status.update = 'failed';
            state.error.update = action.payload;
        })
    }
})

export default todoSlice.reducer;
