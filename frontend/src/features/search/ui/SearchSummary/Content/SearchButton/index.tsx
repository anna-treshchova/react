import SearchIcon from '@/shared/assets/icons/search.svg?react';
import styles from './SearchButton.module.scss';

export const SearchButton = () => (
    <div className={styles.button}>
        <SearchIcon className={styles.icon} />
    </div>
)