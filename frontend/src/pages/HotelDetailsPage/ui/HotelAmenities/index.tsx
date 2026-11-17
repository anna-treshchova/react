import type { HotelDetails } from '@/entities/hotels';
import { AMENITIES_MAP, isAmenity } from './amenities.constants';
import styles from './HotelAmenities.module.scss';

interface HotelAmenitiesProps {
    amenities: HotelDetails['amenities'];
}

export const HotelAmenities = ({ amenities }: HotelAmenitiesProps) => {
    const mappedAmenities = amenities
        .filter(amenity => isAmenity(amenity))
        .map(amenity => AMENITIES_MAP[amenity])

    return (
        <ul className={styles.amenities}>
            {mappedAmenities.map(({ title, description, icon: Icon }) => {
                return (
                    <li key={title} className={styles.amenitiesItem}>
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