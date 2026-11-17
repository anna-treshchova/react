import type { RecentSearchStore } from './useRecentSearchStore';

export const selectRecentSearch = (state: RecentSearchStore) => state.recentSearch;
export const selectHasRecentSearch = (state: RecentSearchStore) => Boolean(state.recentSearch);
export const selectRecentSearchActions = (state: RecentSearchStore) => state.actions;