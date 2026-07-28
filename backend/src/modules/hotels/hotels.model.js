import { readJSONSync } from '#utils/db.js';
import { PATHS } from '#config/paths.js';

let hotelsCache = readJSONSync(PATHS.data.hotels) || [];

export const findHotelById = async (id) => {
    return hotelsCache.find(h => h.id === id) || null;
}

export const findHotels = async ({ city, guests, pets } = {}) => {
    let hotels = hotelsCache;

    if (city) {
        hotels = hotels.filter(h => h.city?.toLowerCase() === city.toLowerCase());
    }

    if (guests) {
        hotels = hotels.filter(hotel => hotel.details?.max_guests >= guests);
    }

    if (pets) {
        hotels = hotels.filter(hotel => hotel.amenities?.includes('Pets allowed'));
    }

    return hotels;
}

