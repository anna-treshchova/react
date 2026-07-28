import { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Grid } from 'antd';

import {HUB_PATHS, DETAILS_PATHS, WISHLIST_PATH } from '../constants/paths.js';
import { useScrollLock } from '../hooks/useScrollLock.js';

import { useLayoutStore } from './useLayoutStore.js';
import {
    selectHasHeaderTransitions,
    selectIsHeaderCollapsed,
    selectIsMainContentLifted,
    selectIsHub,
    selectIsMobile,
    selectLayoutActions
} from './layoutSelectors.js';

const { useBreakpoint } = Grid;

export const useLayoutEffects = () => {
    const navigate = useNavigate();
    const { pathname, search, state } = useLocation();
    const screens = useBreakpoint();

    const isHeaderCollapsed = useLayoutStore(selectIsHeaderCollapsed);
    const isMainContentLifted = useLayoutStore(selectIsMainContentLifted);
    const isHub = useLayoutStore(selectIsHub);
    const isMobile = useLayoutStore(selectIsMobile);
    const hasHeaderTransitions = useLayoutStore(selectHasHeaderTransitions);

    const timerRef = useRef(null);

    const {
        openAuthModal,
        setScreen,
        setHeaderState,
        setPageState,
        setNavHidden,
        setNavIconsHidden,
        setHeaderTransitions,
        setMainContentTransitions,
        setAppTransitions,
        setMainContentLifted,
    } = useLayoutStore(selectLayoutActions);

    useEffect(() => {
        if (!state?.openAuthModal) return;

        openAuthModal()

        navigate({ pathname, search }, { replace: true, state: {} })
    }, [state, pathname, search, navigate, openAuthModal])

    const shouldScrollLock = !isHeaderCollapsed && isMobile;

    useScrollLock(shouldScrollLock);

    const suppressTransitions = useCallback(() => {
        setAppTransitions(false);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setAppTransitions(true);
            timerRef.current = null;
        }, 150)
    }, [setAppTransitions]);

    useEffect(() => {
        const currentScreen = screens.lg
            ? 'desk'
            : screens.md
                ? 'tab'
                : 'mob'

        setScreen(currentScreen);
    }, [screens,  setScreen]);

    useEffect(() => {
        const isHub = HUB_PATHS.includes(pathname) && !search;
        const isDetails = DETAILS_PATHS.some(path => pathname.startsWith(path));
        const isWishlist = WISHLIST_PATH.includes(pathname);

        const pageType = isHub
            ? 'home'
            : isDetails
                ? 'details'
                : isWishlist
                    ? 'wishlist'
                    : 'catalog';

        setPageState({
            pageType,
            isFormDisabled: isHub && pathname !== '/'
        })

        window.scrollTo(0, 0)
    }, [pathname, search, setPageState]);

    useEffect(() => {
        window.addEventListener('resize', suppressTransitions);

        return () => {
            window.removeEventListener('resize', suppressTransitions);
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [suppressTransitions]);

    useEffect(() => {
        const isDesktopHub = isHub && !isMobile;
        setHeaderState({ isHeaderCollapsed: !isDesktopHub })
    }, [isMobile, isHub, pathname, setHeaderState]);

    useEffect(() => {
        if (!isHeaderCollapsed) {
            setNavHidden(false)
            setNavIconsHidden(false)
        }
    }, [isHeaderCollapsed, setNavHidden, setNavIconsHidden]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isMobile]);

    useEffect(() => {
        const headerTimer = setTimeout(() => {
            setHeaderTransitions(true)
        }, 50)

        const mainTimer = setTimeout(() => {
            setMainContentTransitions(false)
        }, 1500)

        return () => {
            clearTimeout(headerTimer)
            clearTimeout(mainTimer)
        }
    }, [setHeaderTransitions, setMainContentTransitions])

    useEffect(() => {
        let timer;

        if (!hasHeaderTransitions) {
            timer = setTimeout(() => {
                setHeaderTransitions(true)
            }, 50)
        }
        return () => clearTimeout(timer)
    }, [hasHeaderTransitions, setHeaderTransitions]);

    useEffect(() => {
        const shouldResetLift = (!isHub && isMainContentLifted)
            || (isMobile && isMainContentLifted)

        if (shouldResetLift) {
           setMainContentLifted(false);
        }
    }, [isHub, isMobile, isMainContentLifted, setMainContentLifted]);
}