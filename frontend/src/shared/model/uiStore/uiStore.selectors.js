export const selectScreen = (state) => state.screen;
export const selectIsMobile = (state) => state.screen === 'mob';

export const selectIsHeaderCollapsed = (state) => state.isHeaderCollapsed;
export const selectIsMainContentLifted = (state) => state.isMainContentLifted;

export const selectIsAuthModalOpen = (state) => state.isAuthModalOpen;

export const selectHasAppTransitions = (state) => state.hasAppTransitions;

export const selectUIActions = (state) => state.actions;