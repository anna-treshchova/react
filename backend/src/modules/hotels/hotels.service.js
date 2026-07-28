import { AppError, ERROR_CODES } from '#shared/errors/index.js';

import { paginate } from '#utils/pagination.js';

import { findDestinationLabel } from '#modules/destinations/destinations.model.js';
import { findUserWishlist, findWishlistItem } from '#modules/wishlist/wishlist.model.js';

import * as model from './hotels.model.js';

export const getHotelDetails = async (hotelId, userId) => {
    const [hotel, isFavorite] = await Promise.all([
        model.findHotelById(hotelId),
        userId ? findWishlistItem(userId, hotelId) : null,
    ])

    if (!hotel) {
        throw new AppError(ERROR_CODES.system.RESOURCE_NOT_FOUND);
    }

    return {
        ...hotel,
        favorite: Boolean(isFavorite)
    };
}

export const getHotels = async ({
    page,
    limit,
    destinationId,
    guests,
    pets,
}, userId ) => {
    const destinationLabel = destinationId
        ? await findDestinationLabel(destinationId)
        : null;

    if (destinationId && !destinationLabel) {
        throw new AppError(ERROR_CODES.system.RESOURCE_NOT_FOUND);
    }

    const filteredHotels = await model.findHotels({
        city: destinationLabel,
        guests,
        pets
    })

    const total = filteredHotels.length;

    if (total === 0) {
        return { hotels: [], total: 0 }
    }

    const paginatedHotels = paginate(filteredHotels, page, limit);

    const hotels = await mapToHotelCards(paginatedHotels, userId)

    return { hotels, total };
}

const mapToHotelCards = async (hotels, userId) => {
    const userWishlist = userId ? await findUserWishlist(userId) : [];

    const wishlistSet = new Set(userWishlist.map(wish => wish.itemId));

    return hotels.map((hotel) => ({
        id: hotel.id,
        name: hotel.name,
        rating: hotel.rating,
        price_per_night: hotel.price_per_night,
        image: hotel.images?.[0],
        favorite: wishlistSet.has(hotel.id),
    }))
}