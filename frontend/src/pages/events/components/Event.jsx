import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

import { Card, Button } from 'antd';

const Event = ({ id, title, imageUrl, instructor, price, date, location }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/events/${id}`);
    };

    const eventDate = new Date(date);
    const formattedDate = `${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;

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
                onClick={handleNavigate}
                style={{marginTop: 20, textAlign: 'center'}}
            >
                See More
            </Button>
        </Card>
    )
}

Event.propTypes = {
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
}

export default Event;

/*———————————————————————————————————————————————————————————

SVG

1. import HomeImg from '@/assets/icons/home.svg';
   <img alt='' src={HomeImg}>

2. import HomeIcon from '@/assets/icons/home.svg?react';
   <HomeIcon />

———————————————————————————————————————————————————————————*/