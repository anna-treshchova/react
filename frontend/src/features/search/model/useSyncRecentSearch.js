import { useEffect } from 'react';

import { calcTotalGuests} from '@/shared/lib/guests.js';
import { generateSearchId } from '@/shared/lib/search.js';

import { useRecentSearchStore } from './useRecentSearchStore';
import { selectRecentSearchActions } from './recentSearchSelectors';

export const useSyncRecentSearch = (items, formParams) => {
    const {nsyncRecentSearchStore } = useRecentSearchStore(selectRecentSearchActions);

    useEffect(() => {
        const recentSearch = useRecentSearchStore.getState().recentSearch;

        if (!items || !recentSearch?.id) return;

        const { destination, guestCategories, dates } = formParams;

        const guests = calcTotalGuests(guestCategories);

        const currentSearchId = generateSearchId({
            destinationId: destination.id,
            dates,
            guests,
        });

        if (currentSearchId !== recentSearch.id) return;

        if (!items.length) {
            clearRecentSearch()
            return;
        }

        if (!recentSearch?.images?.length) {
            const images = items.slice(0, 3).map(hotel => hotel.image);
            updateRecentStoreImages(images);
        }
    }, [formParams, items, clearRecentSearch, updateRecentStoreImages ]);
}
