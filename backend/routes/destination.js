import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    const db = JSON.parse(fs.readFileSync ('db.json', 'utf-8'));
    res.json(db.destinations)
})

export default router;