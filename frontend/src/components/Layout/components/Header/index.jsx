import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { Grid } from 'antd';

import Container from '@/components/Container';

import HeaderBar from './HeaderBar';
import HeroSearch from './HeroSearch';

const { useBreakpoint } = Grid

import styles from './Header.module.scss'

const Header = () => {
    const { pathname } = useLocation();
    const screens = useBreakpoint();

    const isHotel = pathname.startsWith('/search/');

    const [isSearchOpen, setIsSearchOpen] = useState(true);

    useEffect(() => {
        if(screens.md && !pathname.startsWith('/search')) {
            setIsSearchOpen(true);
        } else {
            setIsSearchOpen(false);
        }

    }, [screens.md,  pathname]);

    useEffect(() => {
        if (pathname === '/') return setIsSearchOpen(true);
        if (pathname === '/search/') return setIsSearchOpen(false);
    }, [pathname]);

    if ( isHotel && !screens.md ) return null;

    const backgroundColor = pathname.startsWith('/search') ? '#ffffff' : '#f7f7f7'

    return (
        <header className={styles.header} style={{ backgroundColor }}>
            <Container>
                <HeaderBar
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                />
                <HeroSearch
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                />
            </Container>
        </header>
    )
}

export default Header;