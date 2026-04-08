import { NavLink } from 'react-router';
import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import fullLogo from '@/assets/img/logo/airbnb-full.svg';
import letterLogo from '@/assets/img/logo/airbnb-letter.svg';

import styles from './Logo.module.scss';

const Logo = () => {
    const isHub = useLayoutStore(state => state.isHub);

    const handleClick = () => isHub && window.scrollTo(0, 0);

    return (
        <NavLink
            to={`/`}
            className={styles.logo}
            onClick={handleClick}
        >
            <img src={fullLogo} alt='Logo Airbnb' className={styles.full} />
            <img src={letterLogo} alt='Logo Airbnb' className={styles.letter} />
        </NavLink>
    )
}

export default Logo;