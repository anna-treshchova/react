import { useLoaderData } from 'react-router';

import HotelHeader from './components/Header';
import DesktopGallery from './components/Gallery/DesktopGallery';
import GallerySlider from './components/Gallery/GallerySlider';
import HotelDetails from './components/Details';
import HotelAmenities from './components/Amenities';
import Container from '@/components/Container';

import { Grid } from 'antd';
import styles from './Hotel.module.scss';

const { useBreakpoint } = Grid;

const Hotel = () => {
    const screens = useBreakpoint();
    const hotel = useLoaderData();

    if (!hotel) return;

    return (
        <div className={styles.hotel}>
            {screens.md
                ? <Container narrow>
                    <HotelHeader name={hotel.name} />
                    <DesktopGallery images={hotel.images} />
                  </Container>
                : <>
                    <HotelHeader name={hotel.name} />
                    <GallerySlider images={hotel.images} />
                  </>
            }
            <Container narrow>
                <HotelDetails hotel={hotel} />
                <HotelAmenities amenities={hotel.amenities} />
            </Container>

        </div>
    )
}

export default Hotel;