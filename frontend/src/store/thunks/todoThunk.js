import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetchResponse } from '../../utils/apiHelpers';

const BASE_URL = 'http://localhost:3000/todos';

export const getAllTodos = createAsyncThunk(
    'todos/getAllTodos',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(BASE_URL);
            return await handleFetchResponse(
                res,
                'Oops! Could not fetch your tasks.'
            )

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todoData, { rejectWithValue }) => {
        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData)
            });

            return await handleFetchResponse(
                res,
                'Oops! Could not add the task.'
            )

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async ({ id, checked}, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ checked })
            });

            return await handleFetchResponse(
                res,
                'Oops! Could not change the task status.'
            )

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
            return await handleFetchResponse(
                res,
                'Oops! Could not delete the task'
            );

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (todo, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: todo.title,
                    description: todo.description,
                    completed: todo.completed
                })
            });

            return await handleFetchResponse(
                res,
                'Oops! Could not update the task'
            )

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
