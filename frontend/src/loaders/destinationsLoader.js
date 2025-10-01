import store from '../store';
import { getDestinations } from '../store/thunks/destinationsThunk.js';

async function destinationsLoader() {
    try {
        await store.dispatch(getDestinations());
        return null;
    } catch (err) {
        console.error('Failed to load destinations');
        return null;
    }
}

export default destinationsLoader;