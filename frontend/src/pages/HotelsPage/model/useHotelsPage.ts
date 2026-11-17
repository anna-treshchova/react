import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useLoaderData, useLocation } from 'react-router';

import { mapSearchParamsToFormState, calcGuests, type DateStringRange } from '@/entities/search';
import { useGetHotelsQuery, type Hotel, type GetHotelsQueryParams } from '@/entities/hotels';

import { useRequireAuth, CheckAuth } from '@/features/auth';

import {
    useRecentSearchStore,
    selectHasRecentSearch,
    selectRecentSearchActions,
    generateSearchId
} from '@/features/recentSearch';

type UseHotelsPageReturn = {
    hotels: Hotel[] | undefined;
    total: number | undefined;
    isInitialLoading: boolean;

    search: string;
    page: number;
    dates: DateStringRange;
    hasRecentSearch: boolean;

    handlePageChange: (newPage: number) => void;
    checkAuth: CheckAuth;
}

export const useHotelsPage = (): UseHotelsPageReturn => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryArgs = useLoaderData<GetHotelsQueryParams>();
    const checkAuth = useRequireAuth();

    const hasRecentSearch = useRecentSearchStore(selectHasRecentSearch);
    const { syncRecentSearchImages, clearRecentSearch } = useRecentSearchStore(selectRecentSearchActions);

    const { data, isLoading } = useGetHotelsQuery(queryArgs, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const { hotels, total } = data || {};

    const { destination, guestCategories, dates, page } = useMemo(() => {
        const searchParams = new URLSearchParams(search);
        return mapSearchParamsToFormState(searchParams);
    }, [search])

    const searchId = generateSearchId(
        destination.id,
        dates,
        calcGuests(guestCategories)
    );

    useEffect(() => {
        if (!searchId || page !== 1) return;

        if (!hotels?.length) {
            if (hotels) clearRecentSearch();
            return;
        }

        const images = hotels.slice(0, 3).map(hotel => hotel.image);

        syncRecentSearchImages(searchId, images);

    }, [hotels, searchId, page, syncRecentSearchImages]);

    const handlePageChange = useCallback((newPage: number) => {
        const searchParams = new URLSearchParams(search);

        if (newPage === 1) {
            searchParams.delete('page');
        } else {
            searchParams.set('page', String(newPage));
        }

        navigate({ search: searchParams.toString() });
    }, [search, navigate]);

    return {
        hotels,
        total,
        isInitialLoading: isLoading && !data,

        search,
        page,
        dates,
        hasRecentSearch,

        handlePageChange,
        checkAuth,
    }
}