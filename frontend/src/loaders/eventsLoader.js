const API_URL = 'http://localhost:4000';

export async function eventLoader({ params }) {
    try {
        const res = await fetch(`${API_URL}/events/${params.id}`);

        if (!res.ok) {
            const errBody = await res.json();
            throw new Error(errBody.message || 'Event not found');
        }

        return res.json();
    } catch (err) {
        console.error(err.message);
        return null;
    }

}