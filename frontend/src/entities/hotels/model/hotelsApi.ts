import { baseApi } from '@/shared/api/baseApi';
import type { Draft } from 'immer';

import { isRecord } from '@/shared/lib/type-guards';

import type {
    HotelsQueryFilters,
    GetHotelsQueryParams,
    GetHotelDetailsQueryParams,
    HotelsResponse,
    HotelDetailsResponse
} from './types';

const { VITE_HOTELS_URL } = import.meta.env;

const HOTELS_QUERY_FILTERS_KEYS = [
    'page',
    'limit',
    'destinationId',
    'guests',
    'pets'
] as const satisfies readonly (keyof HotelsQueryFilters)[];

export const hotelsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHotels: builder.query<HotelsResponse, GetHotelsQueryParams>({
            query: (params) => ({
                url: VITE_HOTELS_URL,
                params
            }),
            providesTags: ['Hotels']
        }),
        getHotelDetails: builder.query<HotelDetailsResponse, GetHotelDetailsQueryParams>({
            query: (id) => ({
                url: `${VITE_HOTELS_URL}/${id}`,
            }),
            providesTags: ['HotelDetails']
        })
    })
});

type CacheRecipe<T> = (draft: Draft<T>) => void;

export const hotelsConfig = {
    prefix: 'hotel',
    listEndpoint: 'getHotels',
    detailsEndpoint: 'getHotelDetails',
    listKey: 'hotels',
    detailsKey: 'hotel',

    isListArgs: (value: unknown): value is GetHotelsQueryParams => {
        if (!isRecord(value)) return false;

        return Object.entries(value).every(([key, value]) => {
            if (!HOTELS_QUERY_FILTERS_KEYS.some(filterKey => filterKey === key)) {
                return false;
            }

            if (key === 'destinationId') {
                return typeof value === 'string' || value === null;
            }

            return typeof value === 'number' && Number.isFinite(value);
        });
    },

    isDetailsArgs: (value: unknown): value is GetHotelDetailsQueryParams => {
        return typeof value === 'string'
    },

    updateListCache: (args: unknown, recipe: CacheRecipe<HotelsResponse>) => {
        if (!hotelsConfig.isListArgs(args)) return undefined;

        return hotelsApi.util.updateQueryData(
            hotelsConfig.listEndpoint,
            args,
            recipe
        );
    },

    updateDetailsCache: (args: unknown, recipe: CacheRecipe<HotelDetailsResponse>) => {
        if (!hotelsConfig.isDetailsArgs(args)) return undefined;

        return hotelsApi.util.updateQueryData(
            hotelsConfig.detailsEndpoint,
            args,
            recipe
        );
    },
} as const;

export const { useGetHotelsQuery, useGetHotelDetailsQuery } = hotelsApi;
