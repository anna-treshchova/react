import SearchIcon from '@/assets/icons/search.svg?react';
import styles from './SearchButton.module.scss';

const SearchButton = () => (
    <div className={styles.button}>
        <SearchIcon className={styles.icon} />
    </div>
)

export default SearchButton;