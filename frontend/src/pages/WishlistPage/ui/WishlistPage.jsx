import { useCallback, useEffect } from 'react';

import { Container } from '@/shared/ui/Container';
import { transformToResponseError } from '@/shared/lib/router.js';

import { HotelsList } from '@/entities/hotels';

import { useGetWishlistQuery } from '@/features/wishlist';
import { ToggleWishlistButton } from '@/features/wishlist';

import { EmptyWishlistCard } from './EmptyWishlistCard';
import styles from './WishlistPage.module.scss';

export const WishlistPage = () => {
    const { data, isLoading } = useGetWishlistQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const wishlistItems = data?.wishlist;
    const isInitialLoading = isLoading && !wishlistItems;
    const isEmpty = Array.isArray(wishlistItems) && wishlistItems.length === 0;

    const renderToggleWishlistButton = useCallback((hotel) => (
        <ToggleWishlistButton
            itemId={hotel.id}
            itemName={hotel.name}
            isFavorite={hotel.favorite}
        />
    ), []);

    return (
        <div className={styles.wishlistPage}>
            <Container narrow>
                <h1>Wishlist</h1>
                <HotelsList
                    hotels={wishlistItems}
                    variant={isEmpty ? 'small' : 'large'}
                    renderToggleWishlistButton={renderToggleWishlistButton}
                    emptyStateCard={ isEmpty ? <EmptyWishlistCard /> : null }
                    shouldShowSkeleton={isInitialLoading}
                />
            </Container>
        </div>
    )
}