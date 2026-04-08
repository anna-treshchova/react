import { useEffect, useRef } from 'react';
import { useLayoutStore } from '@/app/layout/useLayoutStore.js';

export const useHeader = () => {
    const mode = useLayoutStore(state => state.mode);
    const isMobile = useLayoutStore(state => state.isMobile);
    const isHub = useLayoutStore(state => state.isHub);

    const {
        setMode,
        setNavOffscreen,
        setIconsOffscreen
    } = useLayoutStore();

    const headerSentinelRef = useRef(null);
    const navSentinelRef = useRef(null);

    const modeRef = useRef(null);
    const mobileRef = useRef(null);

    useEffect(() => {
        modeRef.current = mode;
        mobileRef.current = isMobile;
    }, [mode, isMobile]);

    useEffect(() => {
        if (!isHub || !headerSentinelRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            const isCollapsed = !entry.isIntersecting

            if (mobileRef.current && modeRef.current === 'expanded') return;

            if (!mobileRef.current) {
                setMode({ mode: isCollapsed ? 'collapsed' : 'expanded' });
            } else {
                setIconsOffscreen(isCollapsed);
            }
        })

        observer.observe(headerSentinelRef.current)
        return () => observer.disconnect()
    }, [isHub, setMode, setIconsOffscreen]);


    useEffect(() => {
        if (!isHub || !navSentinelRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (mobileRef.current && modeRef.current === 'expanded') return;

            const collapsed = !entry.isIntersecting
            setNavOffscreen(collapsed);
        })

        observer.observe(navSentinelRef.current)
        return () => observer.disconnect();
    }, [isHub, setNavOffscreen]);

    const openSearch = () => {
        setMode({
            mode: 'expanded',
            isFloating: !isMobile,
            isOverlayActive: !isMobile
        })

        if (isMobile) window.scrollTo(0, 0);
    }

    const closeSearch = () => setMode({ mode: 'collapsed' })

    return {
        headerSentinelRef,
        navSentinelRef,
        openSearch,
        closeSearch,
    }
}