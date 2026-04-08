import { create } from 'zustand';

export const useLayoutStore = create((set) => ({
    mode: 'expanded',
    isFloating: false,
    isOverlayActive: false,

    isHub: true,
    isDetails: false,
    isDisabled: false,

    screen: 'mob',
    isMobile: true,
    isNavOffscreen: false,
    areIconsOffscreen: false,

    noTransitions: false,

    setMode: (payload) => set({
        mode: payload.mode,
        isFloating: payload.isFloating ?? false,
        isOverlayActive: payload.isOverlayActive ?? false,
    }),

    setOverlayActive: (isOverlayActive) => set({ isOverlayActive }),
    setNavOffscreen: (isNavOffscreen) => set({ isNavOffscreen }),
    setIconsOffscreen: (areIconsOffscreen) => set({ areIconsOffscreen }),
    setNoTransitions: (noTransitions) => set({ noTransitions }),


    setNavigation: (payload) =>  set({
        isHub: payload.isHub,
        isDetails: payload.isDetails,
        isDisabled: payload.isDisabled,
    }),

    setScreen: (payload) => set({
        screen: payload.screen,
        isMobile: payload.isMobile
    }),
}))