import express from 'express';

import { readJSON } from '#utils/db.js';
import { paths } from '#config/paths.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const destinations = await readJSON(paths.DB_PATH, 'destinations');
        res.json(destinations);
    } catch (err) {
        console.error('Error reading destinations:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;