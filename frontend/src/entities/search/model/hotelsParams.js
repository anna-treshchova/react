import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { getNumber, setParam } from '@/shared/lib/params.js';

export const mapSearchParamsToFormState = (search) => {
    const searchParams = typeof search === 'string'
        ? new URLSearchParams(search)
        : search;

    return {
        destination: {
            id: searchParams.get('destination') || null,
            label: null,
        },
        guestCategories: {
            adults: getNumber(searchParams.get('adults')),
            children: getNumber(searchParams.get('children')),
            infants: getNumber(searchParams.get('infants')),
            pets: getNumber(searchParams.get('pets')),
        },
        dates: [
            searchParams.get('checkin'),
            searchParams.get('checkout'),
        ],
    }
}

export const mapFormStateToSearchParams = (formState, nextParams = new URLSearchParams()) => {
    const { destination, guestCategories, dates } = formState || {};

    setParam(nextParams, 'destination', destination?.id)

    if (guestCategories) {
        const { adults, children, infants, pets } = guestCategories || {};

        setParam(nextParams, 'adults', adults)
        setParam(nextParams, 'children', children)
        setParam(nextParams, 'infants', infants)
        setParam(nextParams, 'pets', pets)
    }

    if (dates) {
        setParam(nextParams, 'checkin', dates[0])
        setParam(nextParams, 'checkout', dates[1])
    }

    return nextParams;
}

export const useSearchFormParams = () => {
    const [searchParams] = useSearchParams();

    return useMemo(() => {
        return mapSearchParamsToFormState(searchParams);
    }, [searchParams]);
}

