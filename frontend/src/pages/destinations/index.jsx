import { useLoaderData } from 'react-router';

import styles from './Destinations.module.css'

const API_URL = 'http://localhost:3000';

export const destinationsLoader = async () => {
    try {
        const res = await fetch(`${API_URL}/destinations`);
        if (!res.ok) {
            throw new Error('Failed to fetch destinations');
        }
        return res.json();
    } catch (err) {
        console.error(err.message);
    }
}

const Destinations = () => {
    const destinations =  useLoaderData();
    console.log(destinations);

    return (
        <div className={styles.destinations}>Destinations Page</div>
    )
}

export default Destinations;