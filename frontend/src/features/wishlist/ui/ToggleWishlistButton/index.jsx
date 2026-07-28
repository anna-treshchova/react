import { useToggleWishlistItemMutation } from '../../model/wishlistApi.js';

import {
    useLayoutStore,
    selectPageType,
    selectIsMobile,
} from '@/shared/model';

import { CircleButton } from '@/shared/ui/CircleButton';
import { Button } from '@/shared/ui/Button';
import { HeartIcon } from '@/shared/ui/HeartIcon';

export const ToggleWishlistButton = ({ itemId, itemName, isFavorite, canToggle }) => {
    const [toggleWishlistItem] = useToggleWishlistItemMutation();

    const pageType = useLayoutStore(selectPageType);
    const isMobile = useLayoutStore(selectIsMobile);

    const isDetails = pageType === 'details';

    const handleClick = (e) => {
        e.stopPropagation();

        if (canToggle && !canToggle()) {
           return;
        }

        toggleWishlistItem(itemId);
    }

    const getIconVariant = () => {
        if (isDetails) {
            return isFavorite ? 'filled' : 'outline'
        }
        return isFavorite ? 'filled-overlay' : 'outline-overlay'
    }

    const iconProps = {
        variant: getIconVariant(),
        size: isDetails ? 'xs' : 'sm',
        weight: isDetails && isMobile ? 'medium' : 'regular',
    }

    if (isDetails && !isMobile) {
        return (
            <Button size='xs' onClick={handleClick}>
                <HeartIcon {...iconProps} />
                <span style={{ marginLeft: '8px' }}>
                    {isFavorite ? 'Saved' : 'Save'}
                </span>
            </Button>
        )
    }

    if (isDetails && isMobile) {
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

