import { useSelector } from 'react-redux';

import HotelHeader from './components/Header';
import HotelGallery from './components/Gallery';
import HotelDetails from './components/Details';
import HotelAmenities from './components/Amenities';

import styles from './Hotel.module.scss';

const Hotel = () => {
    const hotel = useSelector((state) => state.hotels.selectedItem);

    return (
        <div className={styles.hotel}>
           <HotelHeader name={hotel.name} />
           <HotelGallery images={hotel.images} />
           <HotelDetails hotel={hotel} />
           <HotelAmenities amenities={hotel.amenities} />
        </div>
    )
}

export default Hotel;