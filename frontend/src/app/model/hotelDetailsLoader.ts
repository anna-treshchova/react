import type { LoaderFunctionArgs } from 'react-router';

import { fetchCriticalData } from '@/shared/lib/critical-data';
import { transformToErrorResponse } from '@/shared/lib/error-response';
import { GLOBAL_ERROR_CODES } from '@/shared/constants/error-codes';

import { hotelsApi, type GetHotelDetailsQueryParams } from '@/entities/hotels';

import { store } from '../providers/StoreProvider';

export const hotelDetailsLoader = async (
    { params }: LoaderFunctionArgs
): Promise<GetHotelDetailsQueryParams> => {
    const queryArgs = params.id;

    if (!queryArgs) {
        throw transformToErrorResponse({
           status: 404,
           data: { errorCode: GLOBAL_ERROR_CODES.NOT_FOUND }
        });
    }

    await fetchCriticalData(
        store.dispatch,
        hotelsApi.endpoints.getHotelDetails.initiate,
        queryArgs,
    )

    return queryArgs;
}