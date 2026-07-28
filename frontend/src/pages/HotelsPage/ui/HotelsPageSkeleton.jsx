import { Container } from '@/shared/ui/Container';
import { HotelsListSkeleton } from '@/entities/hotels';
import styles from './HotelsPageSkeleton.module.scss';

export const HotelsPageSkeleton = () => {
    return (
        <Container>
            <div className={styles.hotelsSkeleton}>
                <HotelsListSkeleton />
            </div>
        </Container>
    )
}