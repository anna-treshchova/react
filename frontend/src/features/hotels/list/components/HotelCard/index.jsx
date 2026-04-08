import { Link, useLocation, useSearchParams } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { pluralize } from '@/shared/utils';
import { calcNights, calcTotalPrice } from './utils.js';

import LikeButton from '../LikeButton';
import styles from './HotelCard.module.scss';

const HotelCard = ({ hotel }) => {
    const { search } = useLocation();
    const [searchParams] = useSearchParams();

    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');

    const nights = calcNights(checkin, checkout);
    const totalPrice = calcTotalPrice(hotel.price_per_night, nights);

    const nightsContent = pluralize(nights, 'night');
    const priceContent = `$${totalPrice} for ${nightsContent}`;

    return (
        <Card
            className={styles.hotelCard}
            styles={{ body: { padding: 0 } }}
            cover={
                <div className={styles.imageFrame} style={{ borderRadius: '24px'}}>
                    <Link
                        to={`/hotels/${hotel.id}${search}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img alt={hotel.name} src={hotel.image}/>
                    </Link>
                    <LikeButton id={hotel.id} favorite={hotel.favorite}/>
                </div>
            }
        >
            <Link
                to={`/hotels/${hotel.id}${search}`}
                target='_blank'
                rel='noopener noreferrer'
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
        id: PropTypes.number,
        name: PropTypes.string,
        price_per_night: PropTypes.number,
        image: PropTypes.string,
        favorite: PropTypes.bool,
    }).isRequired
}


export default HotelCard;