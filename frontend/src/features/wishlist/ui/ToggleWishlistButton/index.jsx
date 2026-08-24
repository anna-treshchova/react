import { useToggleWishlistItemMutation } from '../../model/wishlistApi.js';

import { CircleButton } from '@/shared/ui/CircleButton';
import { Button } from '@/shared/ui/Button';
import { HeartIcon } from '@/shared/ui/HeartIcon';

export const ToggleWishlistButton = ({
    itemId,
    itemName,
    isFavorite,
    canToggle,
    isMobile,
    isDetailsPage = false,
}) => {
    const [toggleWishlistItem] = useToggleWishlistItemMutation();

    const handleClick = (e) => {
        e.stopPropagation();

        if (canToggle && !canToggle()) {
           return;
        }

        toggleWishlistItem(itemId);
    }

    const getIconVariant = () => {
        if (isDetailsPage) {
            return isFavorite ? 'filled' : 'outline'
        }
        return isFavorite ? 'filled-overlay' : 'outline-overlay'
    }

    const iconProps = {
        variant: getIconVariant(),
        size: isDetailsPage ? 'xs' : 'sm',
        weight: isDetailsPage && isMobile ? 'medium' : 'regular',
    }

    if (isDetailsPage && !isMobile) {
        return (
            <Button size='xs' onClick={handleClick}>
                <HeartIcon {...iconProps} />
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
                size='md'
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
            size='xs'
            hover='scale'
            onClick={handleClick}
            aria-label={`Save ${itemName} to wishlist`}
            aria-pressed={isFavorite}
        >
            <HeartIcon {...iconProps} />
        </CircleButton>
    )
}

