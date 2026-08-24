import { useLoaderData } from 'react-router';

import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import { GLOBAL_ERROR_CODES, GLOBAL_ERROR_MESSAGES } from '@/shared/constants/error-codes';
import { EMPTY_OBJECT } from '@/shared/constants/empty';

import { useGetHotelDetailsQuery } from '@/entities/hotels';

import { useRequireAuth } from '@/features/auth';

export const useHotelDetails = () => {

    return {
        hotel,
        isMobile,
        isLoading,
        checkAuth
    }
}