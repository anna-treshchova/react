import { fetchCriticalData } from '@/shared/lib/router.js';
import { hotelsApi } from '@/entities/hotels';
import { store } from '../providers/StoreProvider';

export const hotelDetailsLoader = async ({ params }) => {
    const queryArgs = params.id

    await fetchCriticalData(
        store.dispatch,
        hotelsApi.endpoints.getHotelDetails.initiate,
        queryArgs,
    )

    return queryArgs;
}