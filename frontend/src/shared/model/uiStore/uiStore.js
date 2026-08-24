import { create } from 'zustand';

const screenQueries = typeof window !== 'undefined'
    ? {
        mob: window.matchMedia('(max-width: 767px)'),
        tab: window.matchMedia('(min-width: 768px) and (max-width: 991px)'),
        desk: window.matchMedia('(min-width: 992px)')
    }
    : null;

const getScreen = () => {
    if (!screenQueries) return 'mob';
    if (screenQueries.mob.matches) return 'mob';
    if (screenQueries.tab.matches) return 'tab';
    return 'desk';
}

export const useUIStore = create((set) => ({
    screen: getScreen(),

    isHeaderCollapsed: false,
    isMainContentLifted: false,
    hasHeaderOverlay: false,

    isAuthModalOpen: false,

    hasAppTransitions: true,

    actions: {
        setScreen: (value) => set({ screen: value }),

        setHeaderState: ({
            isHeaderCollapsed,
            isMainContentLifted,
            hasHeaderOverlay = false
        }) => set((state) => ({
            isHeaderCollapsed,
            isMainContentLifted: isMainContentLifted ?? state.isMainContentLifted,
            hasHeaderOverlay: state.screen !== 'mob' ? hasHeaderOverlay : false
        })),
        setMainContentLifted: (value) => set({ isMainContentLifted: value }),
        setHeaderOverlay: (value) => set({ hasHeaderOverlay: value }),

        openAuthModal: () => set({ isAuthModalOpen: true }),
        closeAuthModal: () => set({ isAuthModalOpen: false}),

        setAppTransitions: (value) => set({ hasAppTransitions: value }),
        syncScrollState: () => set({
            isHeaderCollapsed: window.scrollY > 50,
            isMainContentLifted: window.scrollY > 50,
        }),
    },
}))

if (screenQueries) {
    let transitionsTimeout = null;

    const handleMediaChange = (e) => {
        if (!e.matches) return;

        const { setScreen, setAppTransitions } = useUIStore.getState().actions;

        setScreen(getScreen())
        setAppTransitions(false);

        if (transitionsTimeout) {
            clearTimeout(transitionsTimeout);
        }

        transitionsTimeout = setTimeout(() => {
            setAppTransitions(true);
            transitionsTimeout = null;
        }, 150)
    }

    screenQueries.mob.addEventListener('change', handleMediaChange);
    screenQueries.tab.addEventListener('change', handleMediaChange);
    screenQueries.desk.addEventListener('change', handleMediaChange);
}
