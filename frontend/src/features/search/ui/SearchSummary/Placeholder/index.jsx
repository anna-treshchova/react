import SearchIcon from '@/shared/assets/icons/search.svg?react'
import styles from './Placeholder.module.scss'

export const SummaryPlaceholder = () => (
    <div className={styles.placeholder}>
        <SearchIcon className={styles.icon} />
        <span>Start your search</span>
    </div>
)