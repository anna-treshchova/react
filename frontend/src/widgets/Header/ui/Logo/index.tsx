import { NavLink } from 'react-router';

import fullLogo from '@/shared/assets/img/logo/airbnb-full.svg';
import letterLogo from '@/shared/assets/img/logo/airbnb-letter.svg';

import styles from './Logo.module.scss';

export const Logo = () => {
    return (
        <NavLink to={`/`} className={styles.logoWrapper}>
            <img src={fullLogo} alt='Logo Airbnb' className={styles.full} />
            <img src={letterLogo} alt='Logo Airbnb' className={styles.letter} />
        </NavLink>
    )
}