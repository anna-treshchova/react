import { useCallback } from 'react';

import { PAGE_SIZE } from '@/shared/config';
import { Pagination } from '@/shared/ui/Pagination';
import { Container }from '@/shared/ui/Container';
import { Fallback } from '@/shared/ui/Fallback';

import { HotelsList } from '@/entities/hotels';

import { RecentSearch } from '@/features/search';
import { ToggleWishlistButton } from '@/features/wishlist';

import { useHotelsPage } from '../model/useHotelsPage.js';
import { HotelsContentWrapper } from './HotelsContentWrapper';
import styles from './HotelsPage.module.scss';

export const HotelsPage = () => {
    const {
        data,
        isLoading,

        search,
        page,
        dates,

        handlePageChange,
        checkAuth,
    } = useHotelsPage();

    const hasNoHotels = !isLoading && data?.hotels?.length === 0;
    const isInitialLoading = isLoading && !data;

    const { hotels, total } = data || {};

    const renderToggleWishlistButton = useCallback((hotel) => (
        <ToggleWishlistButton
            itemId={hotel.id}
            itemName={hotel.name}
            isFavorite={hotel.favorite}
            canToggle={checkAuth}
        />
    ), [checkAuth]);

    if (hasNoHotels) {
        return (
            <Fallback
                variant='empty'
                title='No places found'
                description='Try adjusting your search or clearing the filters.'
            />
        )
    }

    return (
        <div>
            <RecentSearch />
            <Container>
                <HotelsContentWrapper>
                    <HotelsList
                        hotels={hotels}
                        shouldShowSkeleton={isInitialLoading}
                        search={search}
                        dates={dates}
                        renderToggleWishlistButton={renderToggleWishlistButton}
                    >
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
                    </HotelsList>
                </HotelsContentWrapper>
            </Container>
        </div>
    )
}