import {
    useEffect,
    useLayoutEffect,
    useRef,
    type Dispatch,
    type SetStateAction,
    type RefObject,
} from 'react';

import { useUIStore, selectUIActions } from '@/shared/model/uiStore';

interface HeaderObserversProps {
    isHub: boolean;
    isMobile: boolean;
    isHeaderCollapsed: boolean;
    setIsNavHidden: Dispatch<SetStateAction<boolean>>;
    setAreNavIconsHidden: Dispatch<SetStateAction<boolean>>;
}

export interface HeaderObservers {
    headerSentinelRef: RefObject<HTMLDivElement>;
    navSentinelRef: RefObject<HTMLDivElement>;
}

export const useHeaderObservers = ({
    isHub,
    isMobile,
    isHeaderCollapsed,
    setIsNavHidden,
    setAreNavIconsHidden,
}: HeaderObserversProps): HeaderObservers => {

    const headerSentinelRef = useRef<HTMLDivElement>(null);
    const navSentinelRef = useRef<HTMLDivElement>(null);

    const stateRef = useRef({ isMobile, isHeaderCollapsed });

    const { setHeaderState } = useUIStore(selectUIActions);

    useLayoutEffect(() => {
        if (!isHeaderCollapsed || !isMobile || !isHub) {
            setIsNavHidden(false)
            setAreNavIconsHidden(false)
        }
    }, [isHeaderCollapsed, isMobile, isHub,  setIsNavHidden, setAreNavIconsHidden]);

    useEffect(() => {
        stateRef.current = { isHeaderCollapsed, isMobile };
    }, [isHeaderCollapsed, isMobile]);

    useEffect(() => {
        if (!isHub || !headerSentinelRef.current) return;

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
                setAreNavIconsHidden(isCollapsed);
            }
        })

        observer.observe(headerSentinelRef.current)
        return () => observer.disconnect()
    }, [isHub, setHeaderState, setAreNavIconsHidden]);

    useEffect(() => {
        if (!isHub || !navSentinelRef.current ) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (!isMobile) return;

            const collapsed = !entry.isIntersecting;
            setIsNavHidden(collapsed);
        })

        observer.observe(navSentinelRef.current)
        return () => observer.disconnect();
    }, [isHub, isMobile, setIsNavHidden]);

    return { headerSentinelRef, navSentinelRef }
}