import store from '../store';
import { getHotelsPage } from '../store/thunks/hotelsThunk.js';

const API_URL = 'http://localhost:3000';

export async function allHotelsLoader() {
    try {
        await store.dispatch(getHotelsPage(1));
        return null;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function hotelLoader({ params }) {
    const { id } = params;

    try {
        const res = await fetch(`${API_URL}/hotels/${id}`);

        if (!res.ok) {
            const errorBody = await res.json();
            throw new Error(errorBody.message || 'Hotel not found.');
        }
        return res.json();
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

