import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get('/', async (req, res) => {
    const db = JSON.parse(fs.readFileSync ('db.json', 'utf-8'));
    res.json(db.events);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    const event = db.events.find(event => event.id === id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
})

export default router;