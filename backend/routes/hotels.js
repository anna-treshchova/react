import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

router.post('/', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 18;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const { destinationId, guests, pets } = req.body || {};

    try {
        const data = await fs.readFile('db.json', 'utf8');
        const db = JSON.parse(data);

        let hotels = db.hotels;

        if (destinationId) {
            const destination = db.destinations.find(d => d.id === destinationId);

            if (!destination) {
                return res.status(404).json({ message: 'Destination not found' });
            }

            hotels = hotels.filter(
                hotel => hotel.city.toLowerCase() === destination.label.toLowerCase()
            )

            if (hotels || hotels.length === 0) {
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

router.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // Зчитуємо файл
        const data = await fs.readFile('db.json', 'utf8');
        const db = JSON.parse(data);
        const hotels = db.hotels;

        // Знаходимо індекс готелю
        const index = hotels.findIndex(hotel => hotel.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Selected hotel not found.' });
        }

        // Оновлюємо готель
        hotels[index] = {...hotels[index], ...req.body};
        const hotel =  hotels[index];

        // Оновлюємо db.json
        db.hotels = hotels;
        await fs.writeFile('db.json', JSON.stringify(db,  null, 2));

        //Формуємо відповідь
        res.json({
            id: hotel.id,
            name: hotel.name,
            rating: hotel.rating,
            price_per_night: hotel.price_per_night,
            image: hotel.images[0],
            favorite: hotel.favorite,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' });

    }
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const data = await fs.readFile('db.json', 'utf8');
        const db = JSON.parse(data);

        const hotel = db.hotels.find(hotel => hotel.id === id);

        if (!hotel) {
            return res.status(404).json({message: 'Selected hotel not found.'});
        }

        res.json(hotel);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;