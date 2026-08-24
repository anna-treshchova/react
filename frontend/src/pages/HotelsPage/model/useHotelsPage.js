import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useLoaderData, useLocation } from 'react-router';

import { mapSearchParamsToFormState, calcGuests } from '@/entities/search';
import { useGetHotelsQuery } from '@/entities/hotels';

import { useRequireAuth } from '@/features/auth';
import {
    useRecentSearchStore,
    selectHasRecentSearch,
    selectRecentSearchActions,
    generateSearchId
} from '@/features/recentSearch';

export const useHotelsPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryArgs = useLoaderData();
    const checkAuth = useRequireAuth();

    const hasRecentSearch = useRecentSearchStore(selectHasRecentSearch);
    const { syncRecentSearchImages } = useRecentSearchStore(selectRecentSearchActions);

    const { data, isLoading } = useGetHotelsQuery(queryArgs, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const { hotels, total } = data || {};

    const { destination, guestCategories, dates, page } = useMemo(() => {
        const searchParams = new URLSearchParams(search);

        const formState = mapSearchParamsToFormState(searchParams);
        const page = Number(searchParams.get('page')) || 1;

        return { ...formState, page }
    }, [search])

    const searchId = generateSearchId(
        destination?.id,
        dates,
        calcGuests(guestCategories)
    );

    useEffect(() => {
        if (!hotels || !searchId || page !== 1) return;

        const images = hotels.slice(0, 3).map(hotel => hotel.image);

        syncRecentSearchImages(searchId, images);

    }, [hotels, searchId, page, syncRecentSearchImages]);

    const handlePageChange = useCallback((newPage) => {
        const searchParams = new URLSearchParams(search);

        if (Number(newPage) === 1) {
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