import fullLogo from '@/shared/assets/img/logo/airbnb-full.svg';
import letterLogo from '@/shared/assets/img/logo/airbnb-letter.svg';
import BurgerIcon from '@/shared/assets/icons/burger.svg?react';

import { SearchPanelSkeleton } from '@/features/search';

import { NavSkeleton } from './nav';
import styles from './HeaderSkeleton.module.scss';

export const HeaderSkeleton = ({ isHub }) => {
    return (
        <header className={styles.header}>
            <div className={styles.skeletonsGroup}>
                <SearchPanelSkeleton />
                {isHub && <NavSkeleton />}
            </div>
            <div className={styles.topBar}>
                <div className={styles.logoWrapper}>
                    <img src={fullLogo} alt='Logo Airbnb' className={styles.full} />
                    <img src={letterLogo} alt='Logo Airbnb' className={styles.letter} />
                </div>
                <button className={styles.userButton}>
                    <BurgerIcon />
                </button>
            </div>
        </header>
    )
}