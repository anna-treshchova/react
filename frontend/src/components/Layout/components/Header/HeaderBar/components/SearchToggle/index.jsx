import { useLocation } from 'react-router';

import PropTypes from 'prop-types';

import { Grid } from 'antd';

import OpenSearchButton from './components/OpenSearchButton/index.jsx';
import CloseSearchButton from './components/CloseSearchButton/index.jsx';

const { useBreakpoint } = Grid;

const HeaderSearchToggle = ({ isSearchOpen, setIsSearchOpen }) => {
    const screens = useBreakpoint();
    const { pathname } = useLocation();

    const shouldSearchOpen = !screens.md && !isSearchOpen && !pathname.startsWith('/search');
    const shouldSearchClose = !screens.md && isSearchOpen;

    if (shouldSearchOpen) {
       return <OpenSearchButton onClick={() => setIsSearchOpen(true)}/>
    }

    if (shouldSearchClose) {
        return <CloseSearchButton onClick={() => setIsSearchOpen(false)}/>
    }

    return null;
}

HeaderSearchToggle.propTypes = {
    isSearchOpen: PropTypes.bool.isRequired,
    setIsSearchOpen: PropTypes.func.isRequired,
}

export default HeaderSearchToggle;