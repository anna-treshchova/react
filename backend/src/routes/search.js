import express from 'express';

import { readJSON } from '#utils/db.js'

import { paths } from '#config/paths.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { destinationId, query = '' } = req.body;

        const db = await readJSON(paths.DB_PATH);

        const destination = db.destinations.find(d => d.id === destinationId);
        if (!destination) return res.status(404).json({ message: 'Destination not found' });

        const result = db.events.filter(
            e =>
                e.city === destination.label &&
                (e.title.toLowerCase().includes(query.toLowerCase()) ||
                    e.instructor.toLowerCase().includes(query.toLowerCase()))
        );

        res.json(result);

    } catch (err) {
        console.error('Error reading data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;