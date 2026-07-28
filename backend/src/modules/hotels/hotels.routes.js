import express from 'express';
import { PATHS } from '#config/paths.js';
import { readJSON } from '#utils/db.js';

import { getPaginationParams } from '#utils/pagination.js';
import { optimizeUnsplashUrl } from '#utils/images.js';
import { normalizeDpr } from '#utils/normalizeDpr.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const row = req.query;

        const { limit, startIndex } = getPaginationParams(row.page, row.limit);

        const params = {
            destinationId: Number(row.destinationId) || null,
            guests: Number(row.guests ?? 0),
            pets: Number(row.pets ?? 0),
            dpr: normalizeDpr(row.dpr)
        }

        const destinations = await readJSON(PATHS.data.destinations);
        let hotels = await readJSON(PATHS.data.hotels);

        if (params.destinationId) {
            const destination = destinations.find(d => d.id === params.destinationId);

            if (!destination) {
                return res.status(404).json({ message: 'Destination not found' });
            }

            hotels = hotels.filter(
                hotel => hotel.city.toLowerCase() === destination.label.toLowerCase()
            )

            if (hotels.length === 0) {
                return res.status(404).json({message: 'No hotels found in this destination.'});
            }
        }

        if (params.guests) {
            hotels = hotels.filter(hotel => hotel.details?.max_guests >= params.guests);
        }

        if (params.pets) {
            hotels = hotels.filter(hotel => hotel.amenities?.includes('Pets allowed'));
        }

        const paginatedHotels = hotels.slice(startIndex, startIndex + limit);

        const items = paginatedHotels.map(hotel => ({
            id: hotel.id,
            name: hotel.name,
            rating: hotel.rating,
            price_per_night: hotel.price_per_night,
            image: optimizeUnsplashUrl(hotel.images?.[0], 545, params.dpr),
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