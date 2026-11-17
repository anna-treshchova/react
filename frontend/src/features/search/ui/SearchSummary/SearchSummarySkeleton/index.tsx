import { getPageContext } from '@/shared/lib/page-context';
import SearchIcon from '@/shared/assets/icons/search.svg?react';
import homeImage from '@/shared/assets/img/home.avif';

import type { FormFieldConfig } from '../../../model';
import styles from './SearchSummarySkeleton.module.scss';

interface SummarySkeletonProps {
    formFieldsConfig: FormFieldConfig
}

export const SearchSummarySkeleton = ({ formFieldsConfig }: SummarySkeletonProps) => {
    const { pathname, search } = window.location;
    const { isHub } = getPageContext(pathname, search);

    return (
        <div className={styles.summary}>
            <div className={styles.placeholder}>
                <SearchIcon />
                <span>Start your search</span>
            </div>

            <div className={styles.content}>
                <img src={homeImage} alt='Home' />

                <div className={styles.fields}>
                    {Object.values(formFieldsConfig).map((field) => (
                        <div key={field.label} className={styles.field}>
                            <span>
                                {isHub ? field.scrolledText : field.emptySearchText}
                            </span>
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