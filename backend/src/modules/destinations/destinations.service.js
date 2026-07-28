import * as model from './destinations.model.js';

export const getAllDestinations = async () => {
    return await model.findAllDestinations()
}