import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import dayjs from 'dayjs'

import LikeButton from '../LikeButton';

import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

import styles from './HotelCard.module.scss';
import HotelDetails from "@/pages/hotel/components/Details/index.jsx";


const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();

    const [nights, setNights] = useState(2);

    const dates = useSelector((state) => state.filters.dates);

    useEffect(() => {
        const [start, end] = dates

        if (start && end) {
            const startDate = dayjs(String(start));
            const endDate = dayjs(String(end));

            const diff = endDate.diff(startDate, 'day');
            setNights(diff > 0 ? diff : 1);
        }
    }, [dates])

    const handleClick = () => {
        navigate(`/search/${hotel.id}`);
    }

    const nightsText = `${nights} night${nights > 1 ? 's' : ''}`;
    const priceText = `$${hotel.price_per_night * nights} for ${nightsText}`;

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
                    <LikeButton id={hotel.id} favorite={hotel.favorite}/>
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

HotelDetails.propTypes = {
    hotel: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price_per_night: PropTypes.number,
        image: PropTypes.string,
        favorite: PropTypes.bool,
    }).isRequired,
}


export default HotelCard;