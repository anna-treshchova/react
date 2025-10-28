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

    const initialState = {
        destinationId: null,
        destinationLabel: null,
        dates: [null, null],
        nights: 2,
        guests: 0,
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    }

    const [form, setForm] = useState(initialState);
    const [isSearchOpen, setIsSearchOpen] = useState(true);

    useEffect(() => {
        if(screens.md && !pathname.startsWith('/search')) {
            setIsSearchOpen(true);
        } else {
            setIsSearchOpen(false);
        }

    }, [screens.md,  pathname]);

    useEffect(() => {
        if (pathname === '/') {
            setIsSearchOpen(true);
        }

        if (pathname === '/search/') {
            setIsSearchOpen(false);
        }
    }, [pathname]);

    if ( isHotel && !screens.md ) return null;

    const bg = pathname.startsWith('/search') ? '#ffffff' : '#f7f7f7'

    return (
        <header className={styles.header} style={{ backgroundColor: bg }}>
            <Container>
                <HeaderBar
                    form={form}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                />
                <HeroSearch
                    form={form}
                    setForm={setForm}
                    initialState={initialState}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                />
            </Container>
        </header>
    )
}

export default Header;