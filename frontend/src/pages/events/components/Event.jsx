import { useNavigate } from 'react-router';

import { Card, Button } from 'antd';

const Event = ({ event }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/events/${event.id}`);
    };

    const eventDate = new Date(event.date);
    const date = `${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;



    return (
        <Card
            title={event.title}
            cover={<img
                   draggable={false}
                   alt={event.title}
                   src={event.imageUrl}
                   style={{
                       borderRadius: '6px',
                       height: '230px',
                       width: '100%',
                       objectFit: 'cover'
                   }}
            />}
            style={{padding: '10px 15px', minWidth: '50%', boxShadow: '2px 4px 8px rgba(0,0,0,0.1)' }}
        >
            <div style={{textAlign: 'start'}}>
                <p><strong>Instructor: </strong>{event.instructor}</p>
                <p><strong>Description: </strong>{event.description}</p>
                <p><strong>Price: </strong>${event.price}</p>
                <p><strong>Date: </strong>{date}</p>
                <p><strong>Location: </strong>{event.location}</p>
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

export default Event;

/*

SVG

1. import HomeImg from '@/assets/icons/home.svg';
   <img alt='' src={HomeImg}>

2. import HomeIcon from '@/assets/icons/home.svg?react';
   <HomeIcon />









 */