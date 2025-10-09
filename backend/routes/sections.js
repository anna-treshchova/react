import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile('./db.json', 'utf8');
        const sections = JSON.parse(data);
        res.json(sections);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error reading CV data' });
    }
})


router.get('/:section', async (req, res) => {
    const { section } = req.params;

    try {
        const data = await fs.readFile('./db.json', 'utf8');
        const cv = JSON.parse(data);
        if(!cv[section]) return res.status(404).json({message: 'Section not found'});

        res.json(cv[section]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error reading CV data' });
    }
})

export default router;
