import { AppError, ERROR_CODES } from '#shared/errors/index.js';
import { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } from '#config/pagination.js';

export const validateHotelsFilters = (query) => {
    const {
        page: rawPage,
        limit: rawLimit,
        destinationId: rawDestinationId,
        guests,
        pets,
    } = query;

    let page = Number(rawPage ?? DEFAULT_PAGE);
    let limit = Number(rawLimit ?? DEFAULT_LIMIT);
    let destinationId = rawDestinationId || null;

    if (!Number.isInteger(page) || page <= 0) {
        page = DEFAULT_PAGE;
    }

    if (!Number.isInteger(limit) || limit <= 0 ) {
        limit = DEFAULT_LIMIT;
    }

    limit = Math.min(limit, MAX_LIMIT);

    if (destinationId && !destinationId.startsWith('dest_')) {
        destinationId = null;
    }

    return {
        page,
        limit,
        destinationId,
        guests: Number(guests ?? 0),
        pets: Number(pets ?? 0),
    }
}

export const validateHotelIdParam = (params) => {
    const { id } = params;

    if (!id.startsWith('hotel_')) {
        throw new AppError(ERROR_CODES.system.BAD_REQUEST)
    }

    return { id };
}



