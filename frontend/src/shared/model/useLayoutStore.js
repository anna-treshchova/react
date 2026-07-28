import { create } from 'zustand';

export const useLayoutStore = create((set) => ({
    isAuthModalOpen: false,

    screen: 'mob',            // 'mob', 'tab', 'desk'
    pageType: 'home',         // 'home', 'details', 'wishlist', 'catalog'
    isHeaderCollapsed: false,

    hasAppTransitions: true,
    hasHeaderTransitions: false,
    hasMainContentTransitions: true,

    isMainContentLifted: false,

    hasHeaderOverlay: false,

    isFormDisabled: false,

    isNavHidden: false,
    areNavIconsHidden: false,

    actions: {
        openAuthModal: () => set({ isAuthModalOpen: true }),
        closeAuthModal: () => set({ isAuthModalOpen: false}),

        setHeaderState: ({
          isHeaderCollapsed,
          isMainContentLifted,
          hasHeaderOverlay = false
        }) => set((state) => ({
            isHeaderCollapsed,
            isMainContentLifted:
                isMainContentLifted ?? state.isMainContentLifted,
            hasHeaderOverlay:
                state.screen !== 'mob' ? hasHeaderOverlay : false,
        })),

        setHeaderOverlay: (value) => set({ hasHeaderOverlay: value }),

        setScreen: (value) => set({ screen: value }),

        setPageState: ({
          pageType,
          isFormDisabled = false
        }) => set({ pageType, isFormDisabled }),

        setHeaderTransitions: (value) => set({ hasHeaderTransitions: value }),
        setMainContentTransitions: (value) => set({ hasMainContentTransitions: value }),
        setAppTransitions: (value) => set({ hasAppTransitions: value }),

        setNavHidden: (value) => set({ isNavHidden: value }),
        setNavIconsHidden: (value) => set({ areNavIconsHidden: value }),

        setMainContentLifted: (value) => set({ isMainContentLifted: value }),
    },
}))