import { AMENITIES } from '@/constants/amenities.js';

import styles from './Amenities.module.scss';

const HotelAmenities = ({ amenities }) => {
    return (
        <ul className={styles.amenities}>
            {amenities.map(amenity => {
                const { title, description, icon: Icon } = AMENITIES[amenity];
                return (
                    <li key={amenity} className={styles.amenitiesItem}>
                        <Icon/>
                        <div>
                            <h4 className={styles.amenitiesTitle}>{title}</h4>
                            <p className={styles.amenitiesDescription}>{description}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default HotelAmenities;
