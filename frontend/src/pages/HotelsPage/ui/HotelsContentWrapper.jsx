import { useRecentSearchStore, selectRecentSearch } from '@/features/recentSearch';
import styles from './HotelsContentWrapper.module.scss';

export const HotelsContentWrapper = ({ children }) => {
    const hasRecentSearch = !!useRecentSearchStore(selectRecentSearch);

    const className = [
        styles.contentWrapper,
        hasRecentSearch && styles.hasRecentSearch
    ].filter(Boolean).join(' ');

    return (
        <div className={className}>
            {children}
        </div>
    )
}