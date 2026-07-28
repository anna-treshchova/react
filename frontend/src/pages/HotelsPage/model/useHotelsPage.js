import { useCallback, useEffect } from 'react';
import { useNavigate, useLoaderData, useLocation } from 'react-router';

import { calcTotalGuests } from '@/shared/lib/guests';
import { generateSearchId } from '@/shared/lib/search';

import { mapSearchParamsToFormState } from '@/entities/search';
import { useGetHotelsQuery } from '@/entities/hotels';

import { useRecentSearchStore, selectRecentSearchActions } from '@/features/search';
import { useRequireAuth } from '@/features/auth';

export const useHotelsPage = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryArgs = useLoaderData();
    const checkAuth = useRequireAuth();

    const { syncRecentSearchImages } = useRecentSearchStore(selectRecentSearchActions);

    const { data, isLoading } = useGetHotelsQuery(queryArgs, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const { hotels } = data || {};

    const searchParams = new URLSearchParams(search);

    const { destination, guestCategories, dates } =
        mapSearchParamsToFormState(searchParams);

    const page = Number(searchParams.get('page')) || 1;

    const searchId = generateSearchId(
        destination?.id,
        dates,
        calcTotalGuests(guestCategories)
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
        data,
        isLoading,

        search,
        page,
        dates,

        handlePageChange,
        checkAuth,
    }
}

