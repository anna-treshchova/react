import { baseApi } from '@/shared/api/baseApi';
import type { Destination, DestinationsResponse } from './types';

const { VITE_DESTINATIONS_URL } = import.meta.env;

export const destinationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDestinations: builder.query<Destination[], void>({
            query: () => {
                return VITE_DESTINATIONS_URL
            },
            keepUnusedDataFor: Infinity,
            transformResponse: (response: DestinationsResponse) => response.destinations ?? [],
        })
    })
})

export const { useGetDestinationsQuery } = destinationsApi;
