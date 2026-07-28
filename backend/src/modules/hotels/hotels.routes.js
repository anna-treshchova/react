import express from 'express';
import { validateRequest } from '#shared/validation/index.js';
import { optionalAuth } from '#modules/auth/index.js';

import { getHotels, getHotelDetails } from './hotels.controller.js';
import { validateHotelsFilters, validateHotelIdParam } from './hotels.validator.js';

const router = express.Router();

router.get(
    '/',
    optionalAuth,
    validateRequest(validateHotelsFilters, 'query'),
    getHotels
);

router.get(
    '/:id',
    optionalAuth,
    validateRequest(validateHotelIdParam, 'params'),
    getHotelDetails
);

export default router;