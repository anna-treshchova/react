export const selectIsAuthModalOpen = (state) => state.isAuthModalOpen;

export const selectScreen = (state) => state.screen;
export const selectPageType = (state) => state.pageType;
export const selectIsHeaderCollapsed = (state) => state.isHeaderCollapsed;

export const selectHasHeaderTransitions = (state) => state.hasHeaderTransitions;
export const selectHasMainContentTransitions = (state) => state.hasMainContentTransitions;
export const selectHasAppTransitions = (state) => state.hasAppTransitions;

export const selectIsMainContentLifted = (state) => state.isMainContentLifted;
export const selectHasHeaderOverlay = (state) => state.hasHeaderOverlay;
export const selectIsFormDisabled = (state) => state.isFormDisabled;

export const selectIsNavHidden = (state) => state.isNavHidden;
export const selectAreNavIconsHidden = (state) => state.areNavIconsHidden;

export const selectIsHub = (state) => state.pageType === 'home';
export const selectIsMobile = (state) => state.screen === 'mob';

export const selectLayoutActions = (state) => state.actions;