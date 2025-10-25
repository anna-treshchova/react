import { useLocation } from 'react-router';

import { Grid } from 'antd';

import OpenSearchButton from './components/OpenSearchButton/index.jsx';
import CloseSearchButton from './components/CloseSearchButton/index.jsx';

const { useBreakpoint } = Grid;

const HeaderSearchToggle = ({ isSearchOpen, setIsSearchOpen }) => {
    const screens = useBreakpoint();
    const { pathname } = useLocation();

    // if (pathname.startsWith('/hotels/')) return null;

    if (!screens.md && !isSearchOpen && !pathname.startsWith('/search')) return (
        <OpenSearchButton onClick={() => setIsSearchOpen(true)}/>
    );

    if (!screens.md && isSearchOpen) return (
        <CloseSearchButton onClick={() => setIsSearchOpen(false)}/>
    )

    return null;
}

export default HeaderSearchToggle;