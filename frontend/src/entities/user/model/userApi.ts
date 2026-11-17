import { baseApi } from '@/shared/api/baseApi';
const { VITE_USER_ME_URL } = import.meta.env;

export interface User {
    id: string;
    email: string;
    name: null | string;
    role: 'user' | 'admin';
    createdAt: string;
}

interface FetchMeResponse {
    me: User
}

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchMe: builder.query<FetchMeResponse, void>({
            query: () => VITE_USER_ME_URL
        })
    })
})

export const { useFetchMeQuery } = userApi;
