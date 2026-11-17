import type { ReactNode } from 'react';
import { useRecentSearchStore, selectRecentSearch } from '@/features/recentSearch';
import styles from './HotelsContentWrapper.module.scss';

type HotelsContentWrapperProps = {
    children: ReactNode;
}

export const HotelsContentWrapper = (
    { children }: HotelsContentWrapperProps
) => {
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