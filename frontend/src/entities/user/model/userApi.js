import { baseApi } from '@/shared/api/baseApi.js';
const { VITE_USERS_ME_URL } = import.meta.env;

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchMe: builder.query({
            query: () => VITE_USERS_ME_URL
        })
    })
})

export const { useFetchMeQuery, useLazyFetchMeQuery } = userApi;
