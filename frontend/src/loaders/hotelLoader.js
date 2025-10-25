const API_URL = 'http://localhost:3000';

async function hotelLoader({ params}) {
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

export default hotelLoader;
