import { baseApi } from '@/shared/api/baseApi.js';

const { VITE_HOTELS_URL } = import.meta.env;

export const hotelsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: (params) => ({
                url: VITE_HOTELS_URL,
                params
            }),
            providesTags: ['Hotels']
        }),
        getHotelDetails: builder.query({
            query: (id) => ({
                url: `${VITE_HOTELS_URL}/${id}`,
            }),
            providesTags: ['HotelDetails']
        })
    })
});

export const hotelsConfig = {
    prefix: 'hotel',
    listEndpoint: 'getHotels',
    detailsEndpoint: 'getHotelDetails',
    listKey: 'hotels',
    detailsKey: 'hotel',
}

export const { useGetHotelsQuery, useGetHotelDetailsQuery } = hotelsApi;


