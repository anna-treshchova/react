import SearchIcon from '@/shared/assets/icons/search.svg?react';
import styles from './SearchFormSkeleton.module.scss';

export const SearchFormSkeleton = ({ formFieldsConfig = [] }) => {
    return (
        <div className={styles.form}>
            {formFieldsConfig.map(({ title }) => (
                <div key={title} className={styles.field}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.control} />
                </div>
            ))}

            <div className={styles.button}>
                <SearchIcon />
            </div>
        </div>
    )
}