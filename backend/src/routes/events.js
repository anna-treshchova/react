import express from 'express';

import { readJSON } from '#utils/db.js'

import { paths } from '#config/paths.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const events = await readJSON(paths.DB_PATH, 'events');
        res.json(events);
    } catch (err) {
        console.error('Error reading events:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const events = await readJSON(paths.DB_PATH, 'events');
        const event = events.find(event => event.id === id);

        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.json(event);

    } catch (err) {
        console.error('Error reading events:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;