import store from '@/store/index.js';
import { getDestinations } from './destinationsThunk.js';

export async function destinationsLoader() {
    try {
        await store.dispatch(getDestinations());
        return null;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}