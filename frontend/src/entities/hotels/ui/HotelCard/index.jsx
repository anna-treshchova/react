import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { pluralize } from '@/shared/lib/text.js';
import { EMPTY_ARRAY } from '@/shared/constants/empty.js';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { useLayoutStore, selectIsMobile } from '@/shared/model';

import { calcNights, calcTotalPrice } from './utils.js';
import styles from './HotelCard.module.scss';

export const HotelCard = ({
    index,
    hotel,
    search = '',
    dates = EMPTY_ARRAY,
    renderToggleWishlistButton
}) => {
    const isMobile = useLayoutStore(selectIsMobile);

    const isAboveTheFold = index < 18;

    const nights = calcNights(dates);
    const totalPrice = calcTotalPrice(hotel.price_per_night, nights);

    const nightsContent = pluralize(nights, 'night');
    const priceContent = `$${totalPrice} for ${nightsContent}`;

    const hotelUrl = `/hotels/${hotel.id}${search}`
    const linkProps = !isMobile ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <Card
            className={styles.hotelCard}
            styles={{ body: { padding: 0 } }}
            cover={
                <div className={styles.imageFrame} style={{ borderRadius: '24px'}}>
                    <Link to={hotelUrl} {...linkProps}>
                        <OptimizedImage
                            alt={hotel.name}
                            src={hotel.image}
                            loading={isAboveTheFold ? 'eager' : 'lazy'}
                            decoding={isAboveTheFold ? 'sync' : 'async'}
                        />
                    </Link>

                    {renderToggleWishlistButton && (
                        <div className={styles.wishlistButtonWrapper}>
                            {renderToggleWishlistButton(hotel)}
                        </div>
                    )}
                </div>
            }
        >
            <Link
                to={hotelUrl}
                {...linkProps}
            >
                <div className={styles.content}>
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

HotelCard.propTypes = {
    hotel: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price_per_night: PropTypes.number,
        image: PropTypes.string,
        favorite: PropTypes.bool,
    }).isRequired
}