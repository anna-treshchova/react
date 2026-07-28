import SearchIcon from '@/shared/assets/icons/search.svg?react';
import styles from './SearchButton.module.scss';

const SearchButton = () => {
    return (
        <button
            type='submit'
            className={styles.button}
            aria-label='Search'
        >
            <SearchIcon className={styles.icon}/>
            <span className={styles.label}>Search</span>
        </button>
    )
}

export default SearchButton;