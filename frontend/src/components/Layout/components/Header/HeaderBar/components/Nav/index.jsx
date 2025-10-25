import { useLocation } from 'react-router';

import { Grid } from 'antd';

import { NAV_ROUTES } from '@/constants/navRoutes.js';

import AnimatedNavLink from './components/AnimatedNavLink/index.jsx';

import styles from './HeaderNav.module.scss';

const { useBreakpoint } = Grid;

const HeaderNav = ({ isSearchOpen }) => {
    const screens = useBreakpoint();
    const { pathname } = useLocation();


    if (pathname.startsWith('/search') && !isSearchOpen) return null;
    if (screens.md && !isSearchOpen) return null;

    const justify = screens.md || isSearchOpen ? 'center' : 'space-around';


    return (
        <nav
            className={styles.nav}
            style={{ justifyContent: justify }}
        >
            { NAV_ROUTES.map(route => (
                <AnimatedNavLink key={route.label} route={route} isSearchOpen={isSearchOpen} />
            ))}
        </nav>
    )
}

export default HeaderNav;