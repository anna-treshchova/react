import { memo } from 'react';
import type { Dispatch, SetStateAction, JSX } from 'react';
import { Link } from 'react-router';

import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { pluralize } from '@/shared/lib/text';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import { useCoverDistance } from '@/shared/hooks/useCoverDistance';
import type { CardImageSizeVariant } from '@/shared/config/images';

import type { DateStringRange } from '@/entities/search/@x/hotels';

import type { Hotel } from '../../model';
import { calcNights, calcTotalPrice } from './utils';
import styles from './HotelCard.module.scss';

export type HotelCardProps = {
    isFirst: boolean;
    isCriticalImage: boolean;

    hotel: Hotel;
    search?: string;
    dates?: DateStringRange;
    imageSizeVariant?: CardImageSizeVariant;

    onImageReady: () => void;
    saveCoverDistance: Dispatch<SetStateAction<number>>;
    renderCover?: (content: JSX.Element, id: Hotel['id']) => JSX.Element;
    renderWishlistButton: (hotel: Hotel) => JSX.Element;
}

export const HotelCardBase = ({
   isFirst,
   isCriticalImage,

   hotel,
   search = '',
   dates,
   imageSizeVariant = 'standardCard',

   onImageReady,
   saveCoverDistance,

   renderCover,
   renderWishlistButton
}: HotelCardProps) => {
    const isMobile = useUIStore(selectIsMobile);

    const firstCardRef = useCoverDistance({ isFirst, saveCoverDistance });

    const nights = calcNights(dates);
    const totalPrice = calcTotalPrice(hotel.price_per_night, nights);

    const nightsContent = pluralize(nights, 'night');
    const priceContent = `$${totalPrice} for ${nightsContent}`;

    const hotelUrl = `/hotels/${hotel.id}${search}`
    const linkProps = !isMobile ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    const imageContent = (
        <div className={styles.imageFrame}>
            <Link to={hotelUrl} {...linkProps}>
                <OptimizedImage
                    alt={hotel.name}
                    src={hotel.image}
                    variant={imageSizeVariant}
                    loading={isCriticalImage ? 'eager' : 'lazy'}
                    onReady={isCriticalImage ? onImageReady : undefined}
                />
            </Link>

            <div className={styles.wishlistButtonWrapper}>
                {renderWishlistButton(hotel)}
            </div>
        </div>
    )

    return (
        <Card
            ref={isFirst ? firstCardRef : undefined}
            className={styles.hotelCard}
            styles={{ body: { padding: 0 } }}
            cover={renderCover
                ? renderCover(imageContent, hotel.id)
                : imageContent
            }
        >
            <Link to={hotelUrl}>
                <div id={isFirst ? 'text-content' : undefined} className={styles.textContent}>
                    <h4>{hotel.name}</h4>
                    <div className={styles.meta}>
                        <span className={styles.price}>{priceContent}</span>
                        <span className={styles.rating}>
                            <StarFilled />
                            {hotel.rating.toFixed(2)}
                        </span>
                    </div>
                </div>
            </Link>
        </Card>
    )
}

export const HotelCard = memo(HotelCardBase);