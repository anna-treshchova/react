import store from '@/store';
import { fetchSearchResults } from '@/store/thunks/searchThunk.js';

const {
    VITE_BASE_URL: BASE_URL,
    VITE_HOTELS: HOTELS_URL
} = import.meta.env;

export async function allHotelsLoader() {
    try {
        await store.dispatch(fetchSearchResults({ page: 1 }));
        return null;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

export async function hotelLoader({ params }) {
    try {
        const { id } = params;

        const res = await fetch(`${BASE_URL}${HOTELS_URL}/${id}`);

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Hotel not found.');
        }
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

