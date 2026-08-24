import { useState, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigationType } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import { useUIStore, selectUIActions } from '@/shared/model/uiStore';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { getPageContext } from '@/shared/lib/page-context';
import { getSavedScrollY } from '@/shared/lib/scroll';
import {
    hasHeaderPassedTransformThreshold,
    TRANSFORM_HEADER_SENTINEL_HEIGHT
} from '@/shared/lib/header-metrics';

import { useFetchMeQuery } from '@/entities/user';

import { selectHasToken, useAuthModalTrigger } from '@/features/auth';
import { useRecentSearchStore, selectRecentSearchActions } from '@/features/recentSearch';

import { useHeaderObservers } from './useHeaderObservers';
import { useHeaderTransitions } from './useHeaderTransitions';

export const useHeader = () => {
    //React Routing
    const { pathname, search, state } = useLocation();
    const navType = useNavigationType();

    const { isHub, pageType, isWIP } = getPageContext(pathname, search);

    // Global UI Store (Zustand)
    const {
        isMobile,
        isHeaderCollapsed,
        hasHeaderOverlay,
        isMainContentLifted
    } = useUIStore(
        useShallow((state) => ({
            isMobile: state.screen === 'mob',
            isHeaderCollapsed: state.isHeaderCollapsed,
            hasHeaderOverlay: state.hasHeaderOverlay,
            isMainContentLifted: state.isMainContentLifted,
        }))
    );
    const { setHeaderState, setMainContentLifted } = useUIStore(selectUIActions);

    // Feature Stores (Zustand)
    const { initRecentSearch } = useRecentSearchStore(selectRecentSearchActions);

    // Redux / RTK Query data
    const hasToken = useSelector(selectHasToken);
    const { currentData: { me } = {} } = useFetchMeQuery(undefined, { skip: !hasToken });

    // Local State
    const [hasPassedThreshold] = useState(() => {
        const screen = useUIStore.getState().screen;
        const hasTopSlot = Boolean(useRecentSearchStore.getState().recentSearch);

        return hasHeaderPassedTransformThreshold(screen, pageType, hasTopSlot );
    });

    const [isNavHidden, setIsNavHidden] = useState(isMobile && isHub && hasPassedThreshold);
    const [areNavIconsHidden, setAreNavIconsHidden] = useState(false);

    //Mutable State Refs
    const isFistLoad = useRef(true);
    const prevIsHub = useRef(isHub);

    // Initial state
    const isForcedToCollapse = isMobile || !isHub;
    const initialIsHeaderCollapsed = isForcedToCollapse || hasPassedThreshold;
    const actualIsHeaderCollapsed = isFistLoad.current ? initialIsHeaderCollapsed : isHeaderCollapsed;

    //DOM Refs
    const headerRootRef = useHeaderTransitions(state);
    const { headerSentinelRef, navSentinelRef } = useHeaderObservers({
        isHub,
        isMobile,
        isHeaderCollapsed: actualIsHeaderCollapsed,
        setIsNavHidden,
        setAreNavIconsHidden,
    });

    // Custom Hooks
    useAuthModalTrigger(state);
    useScrollLock(isMobile && !isHeaderCollapsed);

    // Effects
    useLayoutEffect(() => {
        if (isFistLoad.current) {
            isFistLoad.current = false;

            setHeaderState({
                isHeaderCollapsed: isForcedToCollapse ? true : hasPassedThreshold,
                isMainContentLifted: isForcedToCollapse ? false : hasPassedThreshold
            });

            return;
        }

        const justEnteredHub = !prevIsHub.current && isHub;
        prevIsHub.current = isHub;

        if (isForcedToCollapse) {
            setHeaderState({ isHeaderCollapsed: true, isMainContentLifted: false });
            return;
        }

        let expectedScroll = window.scrollY;

        if (justEnteredHub) {
            expectedScroll = navType === 'POP' ? getSavedScrollY() : 0;
        }

        if (expectedScroll <= TRANSFORM_HEADER_SENTINEL_HEIGHT.tab) {
            setHeaderState({ isHeaderCollapsed: false, isMainContentLifted: false });
        } else {
            setHeaderState({ isHeaderCollapsed: true, isMainContentLifted: true });
        }
    }, [
        isHub,
        navType,
        isForcedToCollapse,
        hasPassedThreshold,
        setHeaderState,
        setMainContentLifted
    ]);

    //Handlers
    const expandHeader = () => {
        setHeaderState({
            isHeaderCollapsed: false,
            hasHeaderOverlay: true
        })

        if (isMobile) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }

    const collapseHeader = () => {
        setHeaderState({ isHeaderCollapsed: true })
    }

    return {
        data: { me },
        pageContext: { isHub, pageType, isWIP },
        uiState: {
            isMobile,
            isHeaderCollapsed,
            hasHeaderOverlay,
            isMainContentLifted,
            isNavHidden,
            areNavIconsHidden
        },
        actions: { expandHeader, collapseHeader, initRecentSearch },
        refs: { headerSentinelRef, navSentinelRef, headerRootRef }
    }
}