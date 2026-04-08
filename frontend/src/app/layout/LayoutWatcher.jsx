import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router';
import { Grid } from 'antd';
import { useLayoutStore } from './useLayoutStore.js';


const { useBreakpoint } = Grid;

const HUB_PATHS = ['/', '/experiences', '/services'];
const DETAILS_PATHS = ['/hotels/', '/experiences/', '/services/']

export const LayoutWatcher = () => {
    const { pathname, search } = useLocation();
    const screens = useBreakpoint();
    const timerRef = useRef(null);

    const mode = useLayoutStore(state => state.mode);
    const isHub = useLayoutStore(state => state.isHub);
    const screen = useLayoutStore(state => state.screen);
    const isMobile = useLayoutStore(state => state.isMobile);

    const {
        setMode,
        setNavOffscreen,
        setIconsOffscreen,
        setNavigation,
        setScreen,
        setNoTransitions
    } = useLayoutStore();

    const suppressTransitions = useCallback(() => {
        setNoTransitions(true);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setNoTransitions(false);
            timerRef.current = null;
        }, 150)
    },[setNoTransitions]);

    useEffect(() => {
        const currentScreen = screens.lg
            ? 'desk'
            : screens.md
                ? 'tab'
                : 'mob'

        setScreen({
            screen: currentScreen,
            isMobile: currentScreen === 'mob',
        });
    }, [screens,  setScreen]);

    useEffect(() => {
        const isHub = HUB_PATHS.includes(pathname) && !search

        setNavigation({
            isHub,
            isDetails: DETAILS_PATHS.some(path => pathname.startsWith(path)),
            isDisabled: isHub && pathname !== '/'
        })

        suppressTransitions();
        window.scrollTo(0, 0)
    }, [pathname, search, setNavigation, suppressTransitions]);

    useEffect(() => {
        window.addEventListener('resize', suppressTransitions);

        return () => {
            window.removeEventListener('resize', suppressTransitions);
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [suppressTransitions]);

    useEffect(() => {
        const isScrollLocked = mode === 'expanded' && screen === 'mob';
        document.body.style.overflow = isScrollLocked ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        }
    }, [mode, screen]);

    useEffect(() => {
        const hubDesktop = isHub && !isMobile
        setMode({ mode: hubDesktop ? 'expanded' : 'collapsed' })
    }, [isMobile, isHub, setMode]);

    useEffect(() => {
        if (mode === 'expanded') {
            setNavOffscreen(false)
            setIconsOffscreen(false)
        }
    }, [mode, setNavOffscreen, setIconsOffscreen]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isMobile]);

    return null
}





