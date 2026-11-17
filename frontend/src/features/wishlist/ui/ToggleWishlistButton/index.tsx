import type { MouseEvent } from 'react';

import { Button } from '@/shared/ui/Button';
import { CircleButton } from '@/shared/ui/CircleButton';
import { HeartIcon, type HeartIconProps } from '@/shared/ui/HeartIcon';

import { useToggleWishlistItemMutation } from '../../model';

interface ToggleWishlistButtonProps {
    itemId: string;
    itemName: string;
    isFavorite: boolean;
    canToggle?: () => boolean;
    isMobile?: boolean;
    isDetailsPage?: boolean;
}

export const ToggleWishlistButton = ({
    itemId,
    itemName,
    isFavorite,
    canToggle,
    isMobile = false,
    isDetailsPage = false,
}: ToggleWishlistButtonProps) => {
    const [toggleWishlistItem] = useToggleWishlistItemMutation();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (canToggle && !canToggle()) return;
        toggleWishlistItem(itemId);
    }

    const getIconVariant = (): HeartIconProps['variant'] => {
        if (isDetailsPage) {
            return isFavorite ? 'filled' : 'outline';
        }
        return isFavorite ? 'filled-overlay' : 'outline-overlay';
    }

    const iconProps: HeartIconProps = {
        variant: getIconVariant(),
        size: isDetailsPage ? 'sm' : 'md',
        weight: isDetailsPage && isMobile ? 'medium' : 'regular',
    };

    if (isDetailsPage && !isMobile) {
        return (
            <Button size='small' onClick={handleClick}>
                <HeartIcon />
                <span style={{ marginLeft: '8px' }}>
                    {isFavorite ? 'Saved' : 'Save'}
                </span>
            </Button>
        )
    }

    if (isDetailsPage && isMobile) {
        return (
            <CircleButton
                variant='glass'
                size='lg'
                onClick={handleClick}
                aria-label={`Save ${itemName} to wishlist`}
                aria-pressed={isFavorite}
            >
                <HeartIcon {...iconProps} />
            </CircleButton>
        )
    }

    return (
        <CircleButton
            variant='ghost'
            size='sm'
            hover='scale'
            onClick={handleClick}
            aria-label={`Save ${itemName} to wishlist`}
            aria-pressed={isFavorite}
        >
            <HeartIcon {...iconProps} />
        </CircleButton>
    )
}