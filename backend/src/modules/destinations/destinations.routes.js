import express from 'express';
import { getDestinations } from './destinations.controller.js';

const router = express.Router();

router.get('/', getDestinations);

export default router;

