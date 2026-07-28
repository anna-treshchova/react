import { Container } from '@/shared/ui/Container';
import { FadeTransition } from '@/shared/ui/FadeTransition';

import { useHotelDetails } from '../model/useHotelDetails'

import { HotelHeader } from './HotelHeader';
import { DesktopGallery, GallerySlider } from './HotelGallery';
import { HotelSpecs } from './HotelSpecs';
import { HotelAmenities } from './HotelAmenities';
import { HotelDetailsSkeleton } from './HotelDetailsSkeleton';

import styles from './HotelDetailsPage.module.scss';

export const HotelDetailsPage = () => {
    const {
        hotel,
        isMobile,
        isLoading,
        checkAuth,
    } = useHotelDetails();

    const hotelMedia = isMobile ? (
        <>
            <HotelHeader
                id={hotel.id}
                name={hotel.name}
                isFavorite={hotel.favorite}
                checkAuth={checkAuth}
            />
            <GallerySlider images={hotel.images} />
        </>
    ) : (
        <Container narrow>
            <HotelHeader
                id={hotel.id}
                name={hotel.name}
                isFavorite={hotel.favorite}
                checkAuth={checkAuth}
            />
            <DesktopGallery images={hotel.images} />
        </Container>
    )

    return (
        <FadeTransition
            isLoading={isLoading}
            skeleton={<HotelDetailsSkeleton />}
        >
            <div className={styles.hotel}>
                {hotelMedia}

                <Container narrow>
                    <HotelSpecs hotel={hotel} />
                    <HotelAmenities amenities={hotel.amenities} />
                </Container>
            </div>
        </FadeTransition>
    )
}