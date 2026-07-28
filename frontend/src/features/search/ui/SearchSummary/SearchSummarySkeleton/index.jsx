import SearchIcon from '@/shared/assets/icons/search.svg?react';
import HomeIcon from '@/shared/assets/img/home.avif';
import styles from './SearchSummarySkeleton.module.scss';

export const SearchSummarySkeleton = ({ formFieldsConfig = [] }) => {
    return (
        <div className={styles.summary}>
            <div className={styles.placeholder}>
                <SearchIcon />
                <span>Start your search</span>
            </div>

            <div className={styles.content}>
                <img src={HomeIcon} alt='Home' />
                <div className={styles.fields}>
                    {formFieldsConfig.map(({ title, defaultText }) => (
                        <div key={title} className={styles.field}>
                            <span>{defaultText}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.button}>
                    <SearchIcon />
                </div>
            </div>
        </div>
    )
}