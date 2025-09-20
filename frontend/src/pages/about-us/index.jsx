import { useLoaderData } from 'react-router';

import styles from './AboutUs.module.css'

const AboutUs = () => {
    const data = useLoaderData();
    console.log(data)

    return (
        <div className={styles['about-us']}>
            About Us Page
        </div>
    )
}

export default AboutUs