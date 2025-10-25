import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { Card } from 'antd';
import {StarFilled } from '@ant-design/icons';

import LikeButton from '../LikeButton/index.jsx';

import styles from './HotelCard.module.scss';


const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();

    const nightsCount = useSelector((state) => state.hotels.nightsCount);

    const handleClick = () => {
        navigate(`/search/${hotel.id}`);
    }

    const nightsText = `${nightsCount} night${nightsCount > 1 ? 's' : ''}`;
    const priceText = `$${hotel.price_per_night * nightsCount} for ${nightsText}`;

    return (
        <Card
            onClick={handleClick}
            styles={{ body: { padding: 0 } }}
            style={{
                width: '100%',
                border: 'none',
                marginBottom: 24
            }}
            cover={
                <div style={{
                        position: 'relative',
                        aspectRatio: '1 / 0.9',
                        overflow: 'hidden',
                        borderRadius: '24px'
                    }}
                >
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        alt={hotel.name}
                        src={hotel.image}
                    />
                    <LikeButton hotel={hotel}/>
                </div>
            }
        >
            <div className={styles.hotelInfo}>
                <h4 className={styles.hotelName}>{hotel.name}</h4>
                <div className={styles.hotelDescription}>
                    <span className={styles.hotelPrice}>{priceText}</span>
                    <span>
                        <StarFilled style={{ color: '#898989', fontSize: 10, marginRight: 4 }} />
                        {hotel.rating.toFixed(2)}
                     </span>
                </div>
            </div>
        </Card>
    )
}

export default HotelCard;