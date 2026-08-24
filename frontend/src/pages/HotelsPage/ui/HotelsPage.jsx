import { useCallback, useMemo } from 'react';

import { GLOBAL_ERROR_CODES, GLOBAL_ERROR_MESSAGES } from '@/shared/constants/error-codes';
import { PAGE_SIZE } from '@/shared/config/pagination';
import { Pagination } from '@/shared/ui/Pagination';
import { Container }from '@/shared/ui/Container';
import { Fallback } from '@/shared/ui/Fallback';

import { RecentSearch } from '@/features/recentSearch';
import { ToggleWishlistButton } from '@/features/wishlist';

import { HotelsFeed } from '@/widgets/HotelsFeed';

import { useHotelsPage } from '../model/useHotelsPage.js';
import { HotelsContentWrapper } from './HotelsContentWrapper';
import styles from './HotelsPage.module.scss';

export const HotelsPage = () => {
    const {
        hotels,
        total,
        isInitialLoading,

        search,
        page,
        dates,
        hasRecentSearch,

        handlePageChange,
        checkAuth,
    } = useHotelsPage();

    const renderWishlistButton = useCallback((hotel) => (
        <ToggleWishlistButton
            itemId={hotel.id}
            itemName={hotel.name}
            isFavorite={hotel.favorite}
            canToggle={checkAuth}
        />
    ), [checkAuth]);

    const emptySlot = useMemo(() => (
        <Fallback
            variant='empty'
            title='No places found'
            description='Try adjusting your search or clearing the filters.'
        />
    ), [])

    const errorSlot = useMemo(() => (
        <Fallback
            variant='error'
            title='Unable to load content'
            description={GLOBAL_ERROR_MESSAGES[GLOBAL_ERROR_CODES.CRITICAL_DATA_CORRUPTED]}
        />
    ), [])

    return (
        <div className={styles.hotelsRoot} >
            <RecentSearch />
            <Container>
                <HotelsContentWrapper>
                    <HotelsFeed
                        hotels={hotels}
                        search={search}
                        dates={dates}

                        isLoading={isInitialLoading}
                        hasTopSlot={hasRecentSearch}

                        emptySlot={emptySlot}
                        errorSlot={errorSlot}

                        renderWishlistButton={renderWishlistButton}
                    />

                    {!isInitialLoading && total > PAGE_SIZE && (
                        <div className={styles.paginationWrapper}>
                            <Pagination
                                total={total}
                                pageSize={PAGE_SIZE}
                                currentPage={page}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </HotelsContentWrapper>
            </Container>
        </div>
    )
}