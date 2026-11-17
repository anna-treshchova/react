import { Container } from '@/shared/ui/Container';
import { HotelsListSkeleton } from '@/entities/hotels';
import styles from './WishlistSkeleton.module.scss';

export const WishlistSkeleton = () => {
    return (
        <div className={styles.wishlistSkeleton}>
            <Container narrow>
                <h1>Wishlist</h1>
                <HotelsListSkeleton variant='large' />
            </Container>
        </div>
    )
}