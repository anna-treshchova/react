import SearchIcon from '@/assets/icons/Search.svg?react'

import styles from './OpenSearchButton.module.scss';

const OpenSearchButton = ( { onClick = () => {} }) => {
    return (
        <button className={styles.openFormButton} onClick={onClick}>
            <SearchIcon  className={styles.searchIcon} />
            Start your search
        </button>
    )
}

export default OpenSearchButton;