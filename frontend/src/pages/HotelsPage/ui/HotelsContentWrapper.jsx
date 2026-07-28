import { useRecentSearchStore, selectRecentSearch } from '@/features/search';
import styles from './HotelsContentWrapper.module.scss';

export const HotelsContentWrapper = ({ children }) => {
    const hasRecentSearch = !!useRecentSearchStore(selectRecentSearch);

    const contentShift = hasRecentSearch ? 100 : 50;
    const contentTopPadding = hasRecentSearch ? 36 : 60;

    return (
        <div
            className={styles.contentWrapper}
            style={{
                '--content-shift': contentShift,
                '--padding-top': contentTopPadding
        }}
        >
            {children}
        </div>
    )
}