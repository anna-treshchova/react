import { memo } from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { pluralize } from '@/shared/lib/text';
import { EMPTY_ARRAY } from '@/shared/constants/empty';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import { useCoverDistance } from '@/shared/hooks/useCoverDistance';

import { calcNights, calcTotalPrice } from './utils';
import styles from './HotelCard.module.scss';

export const HotelCardBase = ({
    isFirst,
    isCriticalImage,

    hotel,
    search = '',
    dates = EMPTY_ARRAY,

    onImageReady,
    saveCoverDistance,

    renderCover,
    renderToggleWishlistButton,
}) => {
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
                    loading={isCriticalImage ? 'eager' : 'lazy'}
                    onReady={isCriticalImage ? onImageReady : undefined}
                />
            </Link>

            {renderToggleWishlistButton && (
                <div className={styles.wishlistButtonWrapper}>
                    {renderToggleWishlistButton(hotel)}
                </div>
            )}
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

HotelCard.propTypes = {
    hotel: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price_per_night: PropTypes.number,
        image: PropTypes.string,
        favorite: PropTypes.bool,
    }).isRequired
}
