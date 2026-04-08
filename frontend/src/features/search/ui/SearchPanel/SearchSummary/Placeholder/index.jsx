import SearchIcon from '@/assets/icons/search.svg?react'
import styles from './Placeholder.module.scss'

const Placeholder = () => (
    <div className={styles.placeholder}>
        <SearchIcon className={styles.icon} />
        <span>Start your search</span>
    </div>
)

export default Placeholder;