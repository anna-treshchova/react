import { useMemo } from 'react';

import { EMPTY_ARRAY } from '@/shared/constants/empty';

import { useGetDestinationsQuery } from '@/entities/destinations';

import { getDestLabel } from '../../lib';
import {
    useSearchFormStore,
    selectFormState,
    selectGuests,
    selectSearchFormActions
} from '../../model';

export const useSearchForm = () => {
    const { data } = useGetDestinationsQuery();
    const destinations = data ?? EMPTY_ARRAY;

    const formState = useSearchFormStore(selectFormState);
    const guests = useSearchFormStore(selectGuests);

    const {
        setFields,
        setGuestCategory,
        resetFormState
    } = useSearchFormStore(selectSearchFormActions);

    const { destination } = formState;

    const destLabel = useMemo(() => {
        if (destination.label) return destination.label;
        return getDestLabel(destinations, destination.id);
    }, [destinations, destination]);

    return {
        formState: {
            ...formState,
            destination: { id: destination.id, label: destLabel }
        },
        guests,
        destinations,
        setFields,
        setGuestCategory,
        resetFormState,
    }
}