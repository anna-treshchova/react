import { Grid } from 'antd';

import SearchIcon from '@/assets/icons/Search.svg?react'

import styles from './SearchButton.module.scss';

const { useBreakpoint } = Grid;

const SearchButton = () => {
    const screen = useBreakpoint();
    return (
        <button type='submit' className={styles.searchButton}>
            <SearchIcon className={styles.searchIcon}/>
            {!screen.md ? 'Search' : ''}
        </button>
    )
}

export default SearchButton;