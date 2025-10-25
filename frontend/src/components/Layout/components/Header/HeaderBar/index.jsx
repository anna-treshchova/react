import { useLocation } from 'react-router';

import { Grid } from 'antd';

import HeaderLogo from './components/Logo';
import HeaderNav from './components/Nav';
import HeaderSearchToggle from './components/SearchToggle';
import HeaderAuth from './components/Auth';
import HeaderSearchBar from './components/SearchBar'
import HomeButton from '@/components/UI/atoms/HomeButton';
import FiltersButton from '@/components/UI/atoms/FiltersButton';

import styles from './HeaderBar.module.scss';

const { useBreakpoint } = Grid


const HeaderBar = ({ form, isSearchOpen, setIsSearchOpen }) => {
    const { pathname } = useLocation();
    const screens = useBreakpoint();

    const fd = screens.md
        ? 'row'
        : isSearchOpen
            ? 'row-reverse'
            : pathname.startsWith('/search')
                ? 'row'
                : 'column';

    return (
        <div className={styles.headerBar} style={{ flexDirection: fd }}>
            <HeaderLogo setIsSearchOpen={setIsSearchOpen} />
            <HeaderSearchToggle
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
            <HeaderNav isSearchOpen={isSearchOpen} />
            {!isSearchOpen && <HomeButton size='lg' />}
            <HeaderSearchBar
                form={form}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
            {!isSearchOpen && <FiltersButton size='lg' />}
            <HeaderAuth />
        </div>
    )
}

export default HeaderBar;