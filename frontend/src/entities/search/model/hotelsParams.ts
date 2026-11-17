import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { getNumber, setParam } from '@/shared/lib/params';
import type { SearchCriteria } from './types';

export const mapSearchParamsToFormState = (
    search: string | URLSearchParams
): SearchCriteria => {
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
        page: getNumber(searchParams.get('page')) || 1,
    }
}

export const mapFormStateToSearchParams = (
    formState: SearchCriteria,
    nextParams: URLSearchParams = new URLSearchParams()
): URLSearchParams => {
    const { destination, guestCategories, dates, page } = formState;

    setParam(nextParams, 'destination', destination.id)

    const { adults, children, infants, pets } = guestCategories;

    setParam(nextParams, 'adults', adults)
    setParam(nextParams, 'children', children)
    setParam(nextParams, 'infants', infants)
    setParam(nextParams, 'pets', pets)

    setParam(nextParams, 'checkin', dates[0])
    setParam(nextParams, 'checkout', dates[1])

    setParam(nextParams, 'page', page)

    return nextParams;
}

export const useSearchFormParams = () => {
    const [searchParams] = useSearchParams();

    return useMemo(() => {
        return mapSearchParamsToFormState(searchParams);
    }, [searchParams]);
}