import { readJSONSync } from '#utils/db.js';
import { PATHS } from '#config/paths.js';

let destinationsCache = readJSONSync(PATHS.data.destinations) || [];

export const findAllDestinations = async () => {
    return destinationsCache;
}

export const findDestinationLabel = async (id) => {
    const destination = destinationsCache.find(d => d.id === id);
    return destination?.label;
}