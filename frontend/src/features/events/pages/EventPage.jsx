import { useNavigate, useLoaderData } from 'react-router';
import { Button } from 'antd';
import EventDetails from '../components/EventDetails';
import styles from './EventPage.module.css'

const EventPage = () => {
    const navigate = useNavigate();
    const event = useLoaderData();

    if (!event) return <div>Event not found</div>;

    return (
        <div className={styles.wrapper}>
            <Button className={styles.backButton} onClick={() => navigate(-1)}>
                Go back
            </Button>
            <EventDetails event={event} />
        </div>
    )
}

export default EventPage;