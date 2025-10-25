import { NavLink } from 'react-router';
import { Grid } from 'antd';

import fullLogo from '@/assets/img/logo/airbnb-full.svg';
import letterLogo from '@/assets/img/logo/airbnb-letter.svg';

const { useBreakpoint } = Grid;

const HeaderLogo = ({ setIsSearchOpen }) => {
    const screens = useBreakpoint();

    if (!screens.md) return null;

    return (
        <NavLink to='/' onClick={() => setIsSearchOpen(true)}>
            <img
                src={screens.lg ? fullLogo : letterLogo}
                alt='Airbnb Logo'
                style={{ display: 'block' }}
            />
        </NavLink>

    )
}

export default HeaderLogo;