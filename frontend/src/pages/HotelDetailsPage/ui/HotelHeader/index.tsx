import { useLocation, useNavigate } from 'react-router';

import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import { CircleButton } from '@/shared/ui/CircleButton';
import { ToggleWishlistButton } from '@/features/wishlist';
import BackIcon from '@/shared/assets/icons/back.svg?react';

import type { HotelDetails } from '@/entities/hotels';

import type { CheckAuth } from '@/features/auth';

import styles from './HotelHeader.module.scss';

interface HotelHeaderProps {
    id: HotelDetails['id'];
    name: HotelDetails['name'];
    isFavorite: HotelDetails['favorite'];
    checkAuth: CheckAuth;
}

export const HotelHeader = ({
    id,
    name,
    isFavorite,
    checkAuth
}: HotelHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useUIStore(selectIsMobile);

    const handleGoBack = () => {
        if (location.key !== 'default') {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    return (
        <div className={styles.header}>
            {isMobile
                ? (
                    <CircleButton
                        variant='glass'
                        size='lg'
                        onClick={handleGoBack}
                        aria-label='Go back'
                    >
                        <BackIcon />
                    </CircleButton>
                )
                : <h1>{name}</h1>
            }

            <div className={styles.actionsGroup}>
                <ToggleWishlistButton
                    itemId={id}
                    itemName={name}
                    isFavorite={isFavorite}
                    canToggle={checkAuth}
                    isMobile={isMobile}
                    isDetailsPage
                />
            </div>
        </div>
    )
}