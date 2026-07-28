import { baseApi } from '@/shared/api/baseApi.js';
const { VITE_DESTINATIONS_URL } = import.meta.env;

export const destinationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDestinations: builder.query({
            query: () => {
                return VITE_DESTINATIONS_URL
            },
            keepUnusedDataFor: Infinity,
            transformResponse: (response) => response.destinations ?? [],
        })
    })
})

export const { useGetDestinationsQuery } = destinationsApi;
