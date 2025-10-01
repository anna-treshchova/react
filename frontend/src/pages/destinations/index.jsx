import SearchForm from './components/SearchForm';
import HotelList from './components/HotelList';

import styles from './Destinations.module.scss'

const Destinations = () => {
    return (
        <div className={styles.destinations}>
            <section className={styles.searchSection}>
                <SearchForm />
            </section>
            <HotelList />

        </div>
    )
}

export default Destinations;