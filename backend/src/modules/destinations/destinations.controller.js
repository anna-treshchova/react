import * as service from './destinations.service.js';

export const getDestinations = async (req, res, next) => {
    try {
        const destinations = await service.getAllDestinations();
        res.json({ destinations });
    } catch (err) {
        next(err);
    }
}
