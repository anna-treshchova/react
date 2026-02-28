import PropTypes from 'prop-types';
import { formatEventDate } from '../utils/formatEventDate.js';
import { Card, Button } from 'antd';

const EventCard = ({ event, onClick }) => {
    const { title, instructor, location, date, price, imageUrl } = event;

    const formattedDate = formatEventDate(date);

    return (
        <Card
            title={title}
            cover={<img
                   draggable={false}
                   alt={title}
                   src={imageUrl}
                   style={{
                       borderRadius: '6px',
                       height: '230px',
                       width: '100%',
                       objectFit: 'cover'
                   }}
            />}
            style={{
                padding: '10px 15px',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '2px 4px 8px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{textAlign: 'start'}}>
                <p><strong>Instructor: </strong>{instructor}</p>
                <p><strong>Price: </strong>${price}</p>
                <p><strong>Date: </strong>{formattedDate}</p>
                <p><strong>Location: </strong>{location}</p>
            </div>
            <Button
                type='primary'
                onClick={onClick}
                style={{marginTop: 20, textAlign: 'center'}}
            >
                See More
            </Button>
        </Card>
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        instructor: PropTypes.string.isRequired,
        price: PropTypes.number,
        date: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
        ]),
        location: PropTypes.string,
    }).isRequired,
}

export default EventCard;

/*———————————————————————————————————————————————————————————

SVG

1. import HomeImg from '@/assets/icons/home.svg';
   <img alt='' src={HomeImg}>

2. import HomeIcon from '@/assets/icons/home.svg?react';
   <HomeIcon />

———————————————————————————————————————————————————————————*/