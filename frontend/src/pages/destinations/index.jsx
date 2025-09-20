import { useLoaderData } from 'react-router';

import styles from './Destinations.module.css'

const Destinations = () => {
    const data = useLoaderData();
    console.log(data)

    return (
        <div className={styles.destinations}>Destinations</div>
    )
}

export default Destinations;