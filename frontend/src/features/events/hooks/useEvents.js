import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedDestination, setSearchQuery } from '../eventsSlice.js';
import { getEvents } from '../eventsThunk.js';

import useDebounce from '@/shared/hooks/useDebounce.js'

export const useEvents = () => {
    const dispatch = useDispatch();

    const {
        events,
        destinations,
        selectedDestination,
        searchQuery,
        loading,
        errors
    } =  useSelector((state) => state.events);

    const debouncedQuery = useDebounce(searchQuery);  // Custom hook — це не окрема сутність, а просто частина тіла компонента, винесена в функцію

    useEffect(() => {
        if(selectedDestination) {
            dispatch(getEvents({
                destinationId: selectedDestination,
                query: debouncedQuery
            }));
        }
    }, [selectedDestination, debouncedQuery, dispatch]);

    const setDestination = (value) => dispatch(setSelectedDestination(value));
    const setSearch = (value) => dispatch(setSearchQuery(value));

    return {
        events,
        destinations,
        selectedDestination,
        searchQuery,
        loading,
        errors,
        setDestination,
        setSearch,
    }
}