import express from 'express';
import { readJSON } from '#utils/db.js';
import { paths } from '#config/paths.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 18;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const { destinationId, guests, pets } = req.body || {};

        const db = await readJSON(paths.DB_PATH);

        let hotels = db.hotels;

        if (destinationId) {
            const destination = db.destinations.find(d => d.id === destinationId);

            if (!destination) {
                return res.status(404).json({ message: 'Destination not found' });
            }

            hotels = hotels.filter(
                hotel => hotel.city.toLowerCase() === destination.label.toLowerCase()
            )

            if (!hotels || hotels.length === 0) {
                return res.status(404).json({message: 'No hotels found in this destination.'});
            }
        }

        if (guests) {
            hotels = hotels.filter(hotel => hotel.details?.max_guests >= guests);
        }

        if (pets) {
            hotels = hotels.filter(hotel => hotel.amenities?.includes('Pets allowed'));
        }

        const paginatedHotels = hotels.slice(startIndex, endIndex);

        const items = paginatedHotels.map(hotel => ({
            id: hotel.id,
            name: hotel.name,
            rating: hotel.rating,
            price_per_night: hotel.price_per_night,
            image: hotel.images?.[0] || null,
            favorite: hotel.favorite,
        }));

        res.json({
            items,
            total: hotels.length,
        })
    } catch (err) {
        console.error('Error fetching hotels:', err);
        res.status(500).json({ message: 'Internal server error'});
    }
})

export default router;