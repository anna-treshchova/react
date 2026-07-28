import { formFieldsConfig } from '../../model/search.config.js';
import { SearchSummarySkeleton } from '../SearchSummary/SearchSummarySkeleton';
import { SearchFormSkeleton } from '../SearchForm/SearchFormSkeleton';
import styles from './SearchPanelSkeleton.module.scss';

export const SearchPanelSkeleton = () => {
    return (
        <div className={styles.panel}>
            <SearchFormSkeleton formFieldsConfig={formFieldsConfig} />
            <SearchSummarySkeleton formFieldsConfig={formFieldsConfig} />
        </div>
    )
}