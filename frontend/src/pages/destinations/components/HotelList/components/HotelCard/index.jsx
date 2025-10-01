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
        navigate(`/hotels/${hotel.id}`);
    }

    return (
        <Card
            onClick={handleClick}
            bodyStyle={{ padding: 0 }}
            style={{
                width: '100%',
                border: 'none',
                marginBottom: 24
            }}
            cover={
                <div
                    style={{
                        position: 'relative',
                        height: '200px',
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
                    <span className={styles.hotelPrice}>
                        {`$${hotel.price_per_night * nightsCount } for ${nightsCount} night${nightsCount> 1 ? 's' : ''} `}
                    </span>
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