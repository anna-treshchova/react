import { useLoaderData, useNavigate } from 'react-router';

import { Button, Card } from 'antd';

import styles from './Event.module.css'

const Event = () => {
    const navigate = useNavigate();
    const { title, instructor, description, city, location, date, price, imageUrl } = useLoaderData()

    const eventDate = new Date(date);
    const formattedDate = `${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;

    return (
        <div className={styles.wrapper}>
            <Button className={styles.backButton} onClick={() => navigate(-1)}>
                Go back
            </Button>
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
                style={{padding: '10px 15px', maxWidth: '1000px', width: '100%', boxShadow: '2px 4px 8px rgba(0,0,0,0.1)' }}
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
        </div>
    )
}

export default Event