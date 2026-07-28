import * as service from './hotels.service.js';

export const getHotels = async (req, res, next) => {
    const filters = req.query;
    const userId = req.user?.id
    try {
        const { hotels, total } = await service.getHotels(filters, userId);
        res.json({ hotels, total });
    } catch (err) {
        err.context = {
            ...err.context,
            filters,
            userId,
        };

        next(err);
    }
}

export const getHotelDetails = async (req, res, next) => {
    const hotelId = req.params.id;
    const userId = req.user?.id;

    try {
        const hotel = await service.getHotelDetails(hotelId, userId);
        res.json({ hotel });
    } catch (err) {
        err.context = { ...err.context, hotelId };
        next(err);
    }
}

