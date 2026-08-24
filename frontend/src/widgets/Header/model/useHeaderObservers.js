import { useEffect, useLayoutEffect, useRef } from 'react';
import { useUIStore, selectUIActions } from '@/shared/model/uiStore';

export const useHeaderObservers = ({
    isHub,
    isMobile,
    isHeaderCollapsed,
    setIsNavHidden,
    setAreNavIconsHidden,
}) => {
    const headerSentinelRef = useRef(null);
    const navSentinelRef = useRef(null);
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