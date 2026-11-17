import SearchIcon from '@/shared/assets/icons/search.svg?react';
import type { FormFieldConfig } from '../../../model';
import styles from './SearchFormSkeleton.module.scss';

interface FormSkeletonProps {
    formFieldsConfig: FormFieldConfig
}

export const SearchFormSkeleton = ({ formFieldsConfig }: FormSkeletonProps) => {
    return (
        <div className={styles.form}>
            {Object.values(formFieldsConfig).map(({ label }) => (
                <div key={label} className={styles.field}>
                    <span className={styles.label}>{label}</span>
                    <span className={styles.control} />
                </div>
            ))}
            <div className={styles.button}>
                <SearchIcon />
            </div>
        </div>
    )
}