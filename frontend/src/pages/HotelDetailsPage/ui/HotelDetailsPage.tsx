import { useLoaderData } from 'react-router';

import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import { GLOBAL_ERROR_CODES, GLOBAL_ERROR_MESSAGES } from '@/shared/constants/error-codes';
import { Container } from '@/shared/ui/Container';

import { useGetHotelDetailsQuery, type GetHotelDetailsQueryParams } from '@/entities/hotels';

import { useRequireAuth } from '@/features/auth';

import { HotelHeader } from './HotelHeader';
import { DesktopGallery, GallerySlider } from './HotelGallery';
import { HotelSpecs } from './HotelSpecs';
import { HotelAmenities } from './HotelAmenities';
import { HotelDetailsSkeleton } from './HotelDetailsSkeleton';

import styles from './HotelDetailsPage.module.scss';

export const HotelDetailsPage = () => {
    const queryArgs = useLoaderData<GetHotelDetailsQueryParams>();
    const checkAuth = useRequireAuth();
    const isMobile = useUIStore(selectIsMobile);

    const { data, isLoading } = useGetHotelDetailsQuery(queryArgs, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });
    const hotel = data?.hotel;

    if (isLoading) {
        return <HotelDetailsSkeleton isMobile={isMobile} />
    }

    if (!hotel) {
        const errorMessage = GLOBAL_ERROR_MESSAGES[GLOBAL_ERROR_CODES.CRITICAL_DATA_CORRUPTED];
        throw new Response(errorMessage, { status: 500 })
    }

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
        <div className={styles.hotel}>
            {hotelMedia}

            <Container narrow>
                <HotelSpecs hotel={hotel} />
                <HotelAmenities amenities={hotel.amenities} />
            </Container>
        </div>
    )
}

