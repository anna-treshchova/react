import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile('./db.json', 'utf8');
        const cv = JSON.parse(data);
        res.json(cv.profile);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error reading profile data' });
    }
})

export default router;
