import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';

import { parseSearchParams, calcTotalGuests, generateSearchId } from '@/shared/utils';
import { getDestLabel } from '@/features/search/lib/utils.js';

const initialState = {
    destination: {
        id: null,
        label: null
    },
    guestCategories: {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    },
    dates: [null, null],
};

export const useSearchForm = () => {
    const [searchParams] = useSearchParams();
    const destinations = useSelector(state => state.destinations.items);

    const [formState, setFormState] = useState(() => {
        const { page: _page, ...rest } = parseSearchParams(searchParams);
        return rest;
    });

    const { destination, guestCategories, dates } = formState;
    const { adults, children } = guestCategories;

    const guests = calcTotalGuests(adults, children);

    useEffect(() => {
        const { page: _page, ...urlState } = parseSearchParams(searchParams);

        const urlString = JSON.stringify(urlState);

        setFormState(prev => {
            if (urlString !== JSON.stringify(prev)) {
                return urlState;
            }
            return prev;
        });
    }, [searchParams]);

    const destinationLabel = useMemo(() => {
        if (destination.label) return destination.label;
        return getDestLabel(destinations, destination.id);
    }, [destinations, destination.id, destination.label]);

    const getRecentSearchData = () => {
        if (!destination.id) return null;

        const searchId = generateSearchId({
            destinationId: destination.id,
            dates,
            guests
        })

        return ({
            id: searchId,
            destination: {
                id: destination.id,
                label: destinationLabel
            },
            guestCategories,
            dates,
            images: [],
            timestamp: Date.now(),
        })
    }

    const handleGuestChange = useCallback((key, value) => {
        setFormState(prev => {
            const newGuestCategories = {
                ...prev.guestCategories,
                [key]: value
            }

            const { adults, children, infants, pets } = newGuestCategories;

            if (adults === 0 && (children > 0 || infants > 0 || pets > 0 )) {
                newGuestCategories.adults = 1;
            }

            return {
                ...prev,
                guestCategories: newGuestCategories,
            };
        });
    }, [])

    const handleChange = useCallback((key, value) => {
        setFormState(prev => ({
            ...prev,
            [key]: value
        }));
    }, [])

    const handleClear = () => setFormState(initialState);

    return {
        destinationId: destination.id,
        guestCategories,
        guests,
        dates,
        handleChange,
        handleGuestChange,
        handleClear,
        getRecentSearchData
    }
}