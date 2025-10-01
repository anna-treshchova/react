import store from '../store';
import { getHotelById } from '../store/thunks/hotelsThunk.js';

async function hotelLoader({ params}) {
    const { id } = params;

    try {
        await store.dispatch(getHotelById(id));
        return null;
    } catch (err) {
        console.err(`Failed to load hotel with id: ${id}`);
        return null;
    }
}

export default hotelLoader;