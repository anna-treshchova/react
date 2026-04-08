import { create } from 'zustand';
import {
    saveToStorage,
    removeFromStorage,
    loadFromStorage,
    updateStorageField
} from '@/shared/utils';

export const useRecentSearchStore = create((set, get) => ({
    recentSearch: loadFromStorage('recent_search'),

    setRecentSearch: (data) => {
        saveToStorage('recent_search', data)
        set({ recentSearch: data })
    },

    clearRecentSearch: () => {
        removeFromStorage('recent_search');
        set({ recentSearch: null });
    },

    updateRecentStoreImages: (images) => {
        updateStorageField('recent_search', 'images', images);
        const current = get().recentSearch;
        if (current) {
            set({ recentSearch: { ...current, images } });
        }
    }
}))