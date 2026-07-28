import { DEFAULT_PAGE, DEFAULT_LIMIT } from '#config/pagination.js';

export const paginate = (
    items = [],
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT
) => {
    const startIndex = (page - 1) * limit;
    return items.slice(startIndex, startIndex + limit);
}