import { Card } from 'antd';
import { formatEventDate } from '../utils/formatEventDate.js';

const EventDetails = ({ event }) => {
    const { title, instructor, description, city, location, date, price, imageUrl } = event;

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
                    height: '500px',
                    width: '100%',
                    objectFit: 'cover'
                }}
            />}
            style={{
                padding: '10px 15px',
                maxWidth: '1000px',
                width: '100%',
                boxShadow: '2px 4px 8px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{textAlign: 'start'}}>
                <p><strong>Instructor: </strong>{instructor}</p>
                <p><strong>Description: </strong>{description}</p>
                <p><strong>Price: </strong>${price}</p>
                <p><strong>Date: </strong>{formattedDate}</p>
                <p><strong>City: </strong>{city}</p>
                <p><strong>Location: </strong>{location}</p>
            </div>
        </Card>
    )
}

export default EventDetails;