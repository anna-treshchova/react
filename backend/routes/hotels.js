import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.params.id;

    const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    const hotels = db.hotels;
    const filteredHotels = hotels.filter(hotel => hotel.id === id);

    if (!filteredHotels) {
        return res.status(400).json({message: 'No hotels found in this destination.'});
    }

    res.json(filteredHotels);
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    const hotels = db.hotels;
    const hotel = hotels.find(hotel => hotel.id === id);
    if (!hotel) {
        return res.status(404).json({message: 'Selected hotel not found.'});
    }

    res.json(hotel);
})

export default router;