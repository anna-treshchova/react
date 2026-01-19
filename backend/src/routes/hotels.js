import express from 'express';
import { promises as fs } from 'fs';
import { readJSON } from '#utils/db.js';
import { paths } from '#config/paths.js';

const router = express.Router();

router.patch('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const db = await readJSON(paths.DB_PATH);
        const hotels = db.hotels;

        const index = hotels.findIndex(hotel => hotel.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Selected hotel not found.' });
        }

        const hotel = hotels[index] = {...hotels[index], ...req.body};

        db.hotels = hotels;
        await fs.writeFile(paths.DB_PATH, JSON.stringify(db,  null, 2));

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
        const hotels = await readJSON(paths.DB_PATH, 'hotels');

        const hotel = hotels.find(hotel => hotel.id === id);

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