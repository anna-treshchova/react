import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const GET_DESTINATIONS_URL = import.meta.env.VITE_GET_DESTINATIONS;
const GET_EVENTS_URL = import.meta.env.VITE_GET_EVENTS;

export const getDestinations = createAsyncThunk(
    'destinations/getDestinations',
    async (_,  { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${GET_DESTINATIONS_URL}`)

            if (!res.ok) {
                throw new Error('Failed to get destinations');
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    })

export const getEvents = createAsyncThunk(
    'events/getEvents',
    async ({ destinationId, query }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}${GET_EVENTS_URL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ destinationId, query })
            })

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Failed to fetch events');
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }

    })




