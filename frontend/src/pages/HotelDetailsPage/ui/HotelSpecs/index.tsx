import { pluralize } from '@/shared/lib/text';
import type { HotelDetails } from '@/entities/hotels';
import { COUNTRIES_BY_COUNTRY_CODE, isCountryCode } from './countries.constants';
import styles from './HotelSpecs.module.scss';

interface HotelSpecsProps {
    hotel: HotelDetails;
}

export const HotelSpecs = ({ hotel }: HotelSpecsProps) => {
    const { name, address, city, state, country_code, details } = hotel;
    const { max_guests, bedrooms, beds, baths } = details;

    const items = [
        { count: max_guests, singular: 'guest' },
        { count: bedrooms, singular: 'bedroom' },
        { count: beds, singular: 'bed' },
        { count: baths, singular: 'baths' },
    ]

    const country = isCountryCode(country_code)
        ? COUNTRIES_BY_COUNTRY_CODE[country_code]
        : country_code;

    return (
        <div className={styles.details}>
            <h1 className={styles.name}>{name}</h1>
            <h2>
                {`${address}, ${city}, ${state}, ${country}`}
            </h2>
            <ul>
                {items.map(({ count, singular }) => (
                    <li key={singular}>
                        {pluralize(count, singular)}
                    </li>
                ))}
            </ul>
        </div>
    )
}