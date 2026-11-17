import { FORM_FIELDS_CONFIG } from '../../model';
import { SearchSummarySkeleton } from '../SearchSummary/SearchSummarySkeleton';
import { SearchFormSkeleton } from '../SearchForm/SearchFormSkeleton';
import styles from './SearchPanelSkeleton.module.scss';

export const SearchPanelSkeleton = () => {
    return (
        <div className={styles.panelSkeleton}>
            <SearchFormSkeleton formFieldsConfig={FORM_FIELDS_CONFIG} />
            <SearchSummarySkeleton formFieldsConfig={FORM_FIELDS_CONFIG} />
        </div>
    )
}