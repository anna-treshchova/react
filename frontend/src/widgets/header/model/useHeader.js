import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useFetchMeQuery } from '@/entities/user';

import { selectHasToken } from '@/features/auth';

import {
    useLayoutStore,
    selectIsHeaderCollapsed,
    selectScreen,
    selectIsHub,
    selectIsMobile,
    selectPageType,
    selectHasHeaderTransitions,
    selectIsFormDisabled,
    selectHasHeaderOverlay,
    selectIsNavHidden,
    selectAreNavIconsHidden,
    selectHasAppTransitions,
    selectLayoutActions,
} from '@/shared/model';

export const useHeader = () => {
    const hasToken = useSelector(selectHasToken);

    const { currentData: { me } = {} } = useFetchMeQuery(undefined, {
        skip: !hasToken
    });

    const isHeaderCollapsed = useLayoutStore(selectIsHeaderCollapsed);
    const screen = useLayoutStore(selectScreen);
    const pageType = useLayoutStore(selectPageType);

    const isHub = useLayoutStore(selectIsHub);
    const isMobile = useLayoutStore(selectIsMobile);

    const hasHeaderOverlay = useLayoutStore(selectHasHeaderOverlay);
    const isFormDisabled = useLayoutStore(selectIsFormDisabled);
    const isNavHidden = useLayoutStore(selectIsNavHidden);
    const areNavIconsHidden = useLayoutStore(selectAreNavIconsHidden);

    const hasAppTransitions = useLayoutStore(selectHasAppTransitions);
    const hasHeaderTransitions = useLayoutStore(selectHasHeaderTransitions);

    const {
        setHeaderState,
        setNavHidden,
        setNavIconsHidden,
    } = useLayoutStore(selectLayoutActions);

    const headerSentinelRef = useRef(null);
    const navSentinelRef = useRef(null);

    const stateRef = useRef(null);

    useEffect(() => {
        stateRef.current = { isHeaderCollapsed, isMobile };
    }, [isHeaderCollapsed, isMobile]);

    useEffect(() => {
        if (!isHub || !headerSentinelRef.current) return;

        setNavIconsHidden(false);

        let isFirstCall = true;

        const observer = new IntersectionObserver(([entry]) => {
            if(isFirstCall) {
                isFirstCall = false;
                return;
            }

            const isCollapsed = !entry.isIntersecting;
            const { isHeaderCollapsed, isMobile } = stateRef.current;

            if (isMobile && !isHeaderCollapsed) return;

            if (!isMobile) {
                setHeaderState({
                    isHeaderCollapsed: isCollapsed,
                    isMainContentLifted: isCollapsed,
                });
            } else {
                setNavIconsHidden(isCollapsed);
            }
        })

        observer.observe(headerSentinelRef.current)
        return () => observer.disconnect()
    }, [isHub, setHeaderState, setNavIconsHidden]);

    useEffect(() => {
        if (!isHub || !navSentinelRef.current ) return;

        const observer = new IntersectionObserver(([entry]) => {
            const { isHeaderCollapsed, isMobile } = stateRef.current;

            if ((isMobile && !isHeaderCollapsed) || !isMobile) return;

            const collapsed = !entry.isIntersecting;
            setNavHidden(collapsed);
        })

        observer.observe(navSentinelRef.current)
        return () => observer.disconnect();
    }, [isHub, setNavHidden]);

    const expandHeader = () => {
        setHeaderState({
            isHeaderCollapsed: false,
            hasHeaderOverlay: true
        })

        if (isMobile) window.scrollTo(0, 0);
    }

    const collapseHeader = () => {
        setHeaderState({ isHeaderCollapsed: true })
    }

    return {
        me,

        headerSentinelRef,
        navSentinelRef,

        isHeaderCollapsed,
        screen,
        isHub,
        isMobile,
        pageType,

        isFormDisabled,
        hasHeaderOverlay,
        hasHeaderTransitions,
        isNavHidden,
        areNavIconsHidden,
        hasAppTransitions,

        expandHeader,
        collapseHeader,
    }
}