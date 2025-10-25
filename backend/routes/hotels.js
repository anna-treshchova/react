import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

router.post('/', async (req, res) => {
    const { destinationId, guests, pets } = req.body;

    try {
        const data = await fs.readFile('db.json', 'utf8');
        const db = JSON.parse(data);

        const destination = db.destinations.find(d => d.id === destinationId);
        if (!destination) return res.status(404).json({ message: 'Destination not found' });

        const filteredHotels = db.hotels
            .filter(hotel =>
                hotel.city.toLowerCase() === destination.label.toLowerCase() &&
                hotel.details?.max_guests >= guests &&
                (pets === 0 || hotel.amenities?.includes('Pets allowed')) // повертає перший truthy, або останній, якщо всі falsy
            )
            .map(hotel => ({
                id: hotel.id,
                name: hotel.name,
                rating: hotel.rating,
                price_per_night: hotel.price_per_night,
                image: hotel.images[0] || null,
                favorite: hotel.favorite,
            }));

        if (filteredHotels.length === 0) {
            return res.status(404).json({message: 'No hotels found in this destination.'});
        }

        res.json(filteredHotels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });

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