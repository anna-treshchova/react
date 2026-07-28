import { create } from 'zustand';

import { calcTotalGuests } from '@/shared/lib/guests';
import { generateSearchId } from '@/shared/lib/search';
import {
    saveToStorage,
    removeFromStorage,
    loadFromStorage,
    updateStorageField
} from '@/shared/lib/storage';

export const useRecentSearchStore = create((set, get) => ({
    recentSearch: loadFromStorage('recent_search'),

    actions: {
        initRecentSearch: (searchParams) => {
            const { destination, guestCategories, dates } = searchParams;

            if (!destination?.id) return;

            const guests = calcTotalGuests(guestCategories);

            const searchId = generateSearchId(destination.id, dates, guests)

            const current = get().recentSearch;

            if (current?.id === searchId) {
                const updatedSearch = { ...current, timestamp: Date.now()};

                saveToStorage('recent_search', updatedSearch)
                set({ recentSearch: updatedSearch })

                return;
            }

            const newRecentSearch = {
                id: searchId,
                destination: {
                    id: destination.id,
                    label: destination.label
                },
                guestCategories,
                dates,
                images: [],
                timestamp: Date.now(),
            }

            saveToStorage('recent_search', newRecentSearch)
            set({ recentSearch: newRecentSearch })
        },

        clearRecentSearch: () => {
            removeFromStorage('recent_search');
            set({ recentSearch: null });
        },

        syncRecentSearchImages: (searchId, images) => {
            const recentSearch = get().recentSearch;

            if (!recentSearch || recentSearch?.id !== searchId) return;

            if (!images.length) {
                get().actions.clearRecentSearch()
                return;
            }

            updateStorageField('recent_search', 'images', images);

            set({ recentSearch: { ...recentSearch, images } });
        }
    }
}))