import PropTypes from 'prop-types';

import { COUNTRIES } from '@/constants/countries.js';

import styles from './Details.module.scss';

const HotelDetails = ({ hotel }) => {
    const { name, address, city, state, country_code, details } = hotel;
    const { max_guests, bedrooms, beds, baths } = details;

    const pluralize = (count, plural, singular) => `${count} ${count > 1 ? plural : singular}`;

    const items = [
        [max_guests, 'guests', 'guest'],
        [bedrooms, 'bedrooms', 'bedroom'],
        [beds, 'beds', 'bed'],
        [baths, 'baths', 'bath'],
    ]

    return (
        <div className={styles.details}>
            <h1 className={styles.hotelName}>{name}</h1>
            <h2>
                {`${address}, ${city}, ${state}, ${COUNTRIES[country_code]}`}
            </h2>
            <ul>
                {items.map(([count, plural, singular], idx) => (
                    <li key={idx}>
                        {pluralize(count, plural, singular)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

HotelDetails.propTypes = {
    hotel: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country_code: PropTypes.string,
        details: PropTypes.shape({
            max_guests: PropTypes.number,
            bedrooms: PropTypes.number,
            beds: PropTypes.number,
            baths: PropTypes.number,
        }).isRequired,
    }).isRequired,
}

export default HotelDetails;
