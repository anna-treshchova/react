import PropTypes from 'prop-types';
import { AMENITIES } from './amenities.constants.js';
import styles from './HotelAmenities.module.scss';

export const HotelAmenities = ({ amenities }) => {
    return (
        <ul className={styles.amenities}>
            {amenities.map((amenity, idx) => {
                const { title, description, icon: Icon } = AMENITIES[amenity];
                return (
                    <li key={idx} className={styles.amenitiesItem}>
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

HotelAmenities.propTypes = {
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
}
