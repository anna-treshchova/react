import store from '@/store';
import { getDestinations } from '../eventsThunk.js';

export async function destinationsLoader() {
    try {
        await store.dispatch(getDestinations())
        return null
    } catch (err) {
        console.error('Failed to load destinations:', err.message);
        return null;
    }
}
