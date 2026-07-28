import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';

import { useLayoutStore, selectIsMobile } from '@/shared/model';
import { GLOBAL_ERROR_CODES, GLOBAL_ERROR_MESSAGES } from '@/shared/constants/errorCodes';
import { EMPTY_ARRAY, EMPTY_OBJECT} from '@/shared/constants/empty';

import { useGetHotelDetailsQuery } from '@/entities/hotels';

import { useRequireAuth } from '@/features/auth';

export const useHotelDetails = () => {
    const queryArgs = useLoaderData();
    const checkAuth = useRequireAuth();
    const isMobile = useLayoutStore(selectIsMobile);

    const { data, isLoading } = useGetHotelDetailsQuery(queryArgs, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const hotel = data?.hotel || EMPTY_OBJECT;
    const images = hotel.images || EMPTY_ARRAY;

    const [areImagesLoading, setAreaImagesLoading] = useState(true);

    const imagesToTrackCount = isMobile ? 1 : 5;
    const firstViewImages = images.slice(0, imagesToTrackCount);

    useEffect(() => {
        if (firstViewImages.length === 0) return;

        let loadedImagesCount = 0;
        let frameId;

        const handleImageLoad = () => {
            loadedImagesCount += 1;
            if (loadedImagesCount === firstViewImages.length) {
                frameId = requestAnimationFrame(() => {
                    setAreaImagesLoading(false);
                })
            }
        }

        firstViewImages.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad;
        })

        return () => cancelAnimationFrame(frameId);
    }, [firstViewImages])

    if (!hotel) {
        const errorMessage =
            GLOBAL_ERROR_MESSAGES[GLOBAL_ERROR_CODES.CRITICAL_DATA_CORRUPTED];

        throw new Response(errorMessage, { status: 500 })
    }

    return {
        hotel,
        isMobile,
        isLoading: isLoading || areImagesLoading,
        checkAuth,
    }
}