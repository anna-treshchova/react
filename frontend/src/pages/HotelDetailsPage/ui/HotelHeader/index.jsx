import { useLocation, useNavigate } from 'react-router';

import { useLayoutStore, selectIsMobile } from '@/shared/model';
import { CircleButton } from '@/shared/ui/CircleButton';
import { ToggleWishlistButton } from '@/features/wishlist';
import BackIcon from '@/shared/assets/icons/back.svg?react';

import styles from './HotelHeader.module.scss';

export const HotelHeader = ({ id, name, isFavorite, checkAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useLayoutStore(selectIsMobile);

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
                        size='md'
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
                />
            </div>
        </div>
    )
}
