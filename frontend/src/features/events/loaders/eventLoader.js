const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function eventLoader({ params }) {
    try {
        const res = await fetch(`${BASE_URL}/events/${params.id}`);

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