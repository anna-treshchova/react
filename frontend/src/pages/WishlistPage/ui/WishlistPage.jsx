import { useCallback, useMemo } from 'react';
import { Row, Col } from 'antd';

import { useColSpan } from '@/shared/hooks/useColSpan';
import { Container } from '@/shared/ui/Container';

import { HotelsList } from '@/entities/hotels';

import { useGetWishlistQuery } from '@/features/wishlist';
import { ToggleWishlistButton } from '@/features/wishlist';

import { EmptyWishlistCard } from './EmptyWishlistCard';
import styles from './WishlistPage.module.scss';

export const WishlistPage = () => {
    const { data, isLoading } = useGetWishlistQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const { colSpan } = useColSpan('small');

    const wishlistItems = data?.wishlist;
    const isInitialLoading = isLoading && !wishlistItems;

    const renderToggleWishlistButton = useCallback((hotel) => (
        <ToggleWishlistButton
            itemId={hotel.id}
            itemName={hotel.name}
            isFavorite={hotel.favorite}
        />
    ), []);

    const emptySlot = useMemo(() => (
        <Row gutter={16}>
            <Col span={colSpan}>
                <EmptyWishlistCard />
            </Col>
        </Row>
    ), [colSpan])

    return (
        <div className={styles.wishlistPage}>
            <Container narrow>
                <h1>Wishlist</h1>
                <HotelsList
                    hotels={wishlistItems}
                    variant='large'

                    emptySlot={emptySlot}

                    shouldShowSkeleton={isInitialLoading}
                    renderToggleWishlistButton={renderToggleWishlistButton}
                />
            </Container>
        </div>
    )
}