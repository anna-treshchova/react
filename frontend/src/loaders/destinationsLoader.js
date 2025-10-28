import store from '../store';
import { getDestinations } from '../store/thunks/destinationsThunk.js';

export async function destinationsLoader() {
    try {
        await store.dispatch(getDestinations());
        return null;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}