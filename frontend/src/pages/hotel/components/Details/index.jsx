import { COUNTRIES } from '@/constants/countries.js';

import styles from './Details.module.scss';

const HotelDetails = ({ hotel }) => {

    const pluralize = (count, plural, singular) => `${count} ${count > 1 ? plural : singular}`;

    return (
        <div className={styles.details}>
            <h2>
                {`${hotel.address}, ${hotel.city},  ${hotel.state}, ${COUNTRIES[hotel.country_code]}`}
            </h2>
            <ul>
                <li>{pluralize(hotel.details.max_guests, 'guests',  'guest')}</li>
                <li>{pluralize(hotel.details.bedrooms, 'bedrooms',  'bedroom')}</li>
                <li>{pluralize(hotel.details.beds, 'beds',  'bed')}</li>
                <li>{pluralize(hotel.details.baths, 'baths',  'bath')}</li>
            </ul>
        </div>
    )
}
export default HotelDetails;
