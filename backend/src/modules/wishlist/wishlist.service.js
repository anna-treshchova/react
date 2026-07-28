import * as wishlistModel from './wishlist.model.js';
import { findHotels } from '#modules/hotels/hotels.model.js';

export const toggleWishlistItem = async (userId, itemId) => {
    const wishlistItem = await wishlistModel.findWishlistItem(userId, itemId);

    if (!wishlistItem) {
        await wishlistModel.createWishlistItem(userId, itemId);
    } else {
        await wishlistModel.deleteWishlistItem(userId, itemId);
    }
}

export const getWishlist = async (userId) => {
    const userWishlist = userId ? await wishlistModel.findUserWishlist(userId) : [];
    const wishlistSet = new Set(userWishlist.map(wish => wish.itemId));

    const hotels = await findHotels();

    const wishlist = hotels.filter(hotel => wishlistSet.has(hotel.id));

    return mapToHotelCards(wishlist);
}

const mapToHotelCards = (hotels) => {
    return hotels.map((hotel) => ({
        id: hotel.id,
        name: hotel.name,
        rating: hotel.rating,
        price_per_night: hotel.price_per_night,
        image: hotel.images?.[0],
        favorite: true,
    }))
}
