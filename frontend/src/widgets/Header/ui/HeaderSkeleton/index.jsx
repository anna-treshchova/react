import fullLogo from '@/shared/assets/img/logo/airbnb-full.svg';
import letterLogo from '@/shared/assets/img/logo/airbnb-letter.svg';
import BurgerIcon from '@/shared/assets/icons/burger.svg?react';

import { SearchPanelSkeleton } from '@/features/search/index.js';

import { NavSkeleton } from '../NavSkeleton';
import styles from './HeaderSkeleton.module.scss';

export const HeaderSkeleton = () => {
    return (
        <div className={styles.headerRoot}>
            <header className={styles.headerSkeleton}>
                <div className={styles.headerContent}>
                    <SearchPanelSkeleton />
                    <NavSkeleton />
                </div>
                <div className={styles.headerRow}>
                    <div className={styles.logoWrapper}>
                        <img src={fullLogo} alt='Logo Airbnb' className={styles.full} />
                        <img src={letterLogo} alt='Logo Airbnb' className={styles.letter} />
                    </div>
                    <button className={styles.userButton}>
                        <BurgerIcon />
                    </button>
                </div>
            </header>
        </div>
    )
}