import { create } from 'zustand';

import {
    saveToStorage,
    removeFromStorage,
    loadFromStorage,
    updateStorageField
} from '@/shared/lib/storage';

import { calcGuests } from '@/entities/search';

import { generateSearchId } from '../lib';

export const useRecentSearchStore = create((set, get) => ({
    recentSearch: loadFromStorage('recent_search'),

    actions: {
        initRecentSearch: (searchParams) => {
            const { destination, guestCategories, dates } = searchParams;

            if (!destination?.id) return;

            const guests = calcGuests(guestCategories);

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

            const limitedImages = images.length > 3
                ? images.slice(0, 3)
                : images;

            updateStorageField('recent_search', 'images', limitedImages);

            set({ recentSearch: { ...recentSearch, limitedImages } });
        }
    }
}))