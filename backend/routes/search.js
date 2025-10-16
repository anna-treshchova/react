import express from 'express';
import fs from 'fs';

const router = express.Router();

router.post('/', async (req, res) => {
    const { destinationId, query = '' } = req.body;

    const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

    const destination = db.destinations.find(d => d.id === destinationId);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });

    const result = db.events.filter(
        e =>
            e.city === destination.label &&
            (e.title.toLowerCase().includes(query.toLowerCase()) ||
            e.instructor.toLowerCase().includes(query.toLowerCase()))
    );

    res.json(result);
})

export default router;