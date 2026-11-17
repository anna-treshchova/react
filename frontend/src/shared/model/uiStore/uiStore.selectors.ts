import type { UIStore } from './uiStore';

export const selectScreen = (state: UIStore) => state.screen;
export const selectIsMobile = (state: UIStore) => state.screen === 'mob';

export const selectIsHeaderCollapsed = (state: UIStore) => state.isHeaderCollapsed;
export const selectIsMainContentLifted = (state: UIStore) => state.isMainContentLifted;

export const selectIsAuthModalOpen = (state: UIStore) => state.isAuthModalOpen;

export const selectUIActions = (state: UIStore) => state.actions;

export const selectHasAppTransitions = (state: UIStore) => state.hasAppTransitions;