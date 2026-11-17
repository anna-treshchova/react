import { Container } from '@/shared/ui/Container';

import { DesktopGallerySkeleton } from './DesktopGallerySkeleton';
import { ActionsSkeleton } from './ActionsSkeleton';

import styles from './HotelDetailsSkeleton.module.scss';

interface DetailsSkeletonProps {
    isMobile: boolean;
}

export const HotelDetailsSkeleton = ({ isMobile }: DetailsSkeletonProps) => {
    return (
        <div className={styles.hotelSkeleton}>
            {isMobile ? (
                    <>
                        <ActionsSkeleton />
                        <div className={styles.gallerySlider}/>
                    </>
                ) : (
                    <Container narrow>
                        <div className={styles.name} />
                        <DesktopGallerySkeleton />
                    </Container>
                )
            }
            <Container narrow>
                <div className={styles.details}>
                    {isMobile &&  <div className={styles.name}/>}
                    <div className={styles.specs} />
                    <div className={styles.amenities} />
                </div>
            </Container>
        </div>
    )
}
