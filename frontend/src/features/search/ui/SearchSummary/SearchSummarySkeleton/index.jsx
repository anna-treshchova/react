import { getPageContext } from '@/shared/lib/page-context';
import SearchIcon from '@/shared/assets/icons/search.svg?react';
import homeImage from '@/shared/assets/img/home.avif';

import styles from './SearchSummarySkeleton.module.scss';

export const SearchSummarySkeleton = ({ formFieldsConfig = [] }) => {
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
                    {formFieldsConfig.map((field) => (
                        <div key={field.title} className={styles.field}>
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