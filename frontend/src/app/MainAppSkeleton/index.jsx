import { useUIStore, selectScreen, selectIsHeaderCollapsed } from '@/shared/model/uiStore';
import { getPageContext } from '@/shared/lib/page-context';
import { hasHeaderPassedTransformThreshold } from '@/shared/lib/header-metrics';

import { useRecentSearchStore, selectHasRecentSearch } from '@/features/recentSearch';
import { HeaderSkeleton } from '@/widgets/header';

import { HotelsPageSkeleton } from '@/pages/HotelsPage';
import { HotelDetailsSkeleton } from '@/pages/HotelDetailsPage';
import { WishlistSkeleton } from '@/pages/WishlistPage';

export const MainAppSkeleton = () => {
    const { pathname, search } = window.location;
    const { pageType, isHub } = getPageContext(pathname, search);

    const screen = useUIStore(selectScreen);
    const hasTopSlot = useRecentSearchStore(selectHasRecentSearch);

    const hasPassedThreshold = hasHeaderPassedTransformThreshold(screen, pageType, hasTopSlot);

    const isForcedToCollapse = screen === 'mob' || !isHub;

    const renderContentSkeleton = () => {
        switch (pageType) {
            case 'details':
                return <HotelDetailsSkeleton isMobile={screen === 'mob'} />
            case 'wishlist':
                return <WishlistSkeleton />
            case 'hub':
            case 'catalog':
                return <HotelsPageSkeleton />
        }
    }

    return (
        <div
            data-hub={isHub}
            data-page-type={pageType}
            data-header-collapsed={isForcedToCollapse ? true : hasPassedThreshold}
            data-passed-threshold={hasPassedThreshold}
        >
            <HeaderSkeleton />
            <main>
                {renderContentSkeleton()}
            </main>
        </div>
    )
}