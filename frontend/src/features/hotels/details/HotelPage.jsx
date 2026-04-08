import { useLoaderData } from 'react-router';
import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import HotelHeader from './components/Header';
import DesktopGallery from './components/Gallery/DesktopGallery.jsx';
import GallerySlider from './components/Gallery/GallerySlider.jsx';
import HotelSpecs from './components/Specs';
import HotelAmenities from './components/Amenities';
import Container from '@/app/layout/components/Container';

import styles from './HotelPage.module.scss';

const HotelDetail = () => {
    const hotel = useLoaderData();
    const isMobile = useLayoutStore(state => state.isMobile);

    if (!hotel) return;

    return (
        <div className={styles.hotel}>
            {isMobile
                ? <>
                    <HotelHeader name={hotel.name} />
                    <GallerySlider images={hotel.images} />
                  </>
                : <Container narrow>
                    <HotelHeader name={hotel.name} />
                    <DesktopGallery images={hotel.images} />
                  </Container>
            }
            <Container narrow>
                <HotelSpecs hotel={hotel} />
                <HotelAmenities amenities={hotel.amenities} />
            </Container>
        </div>
    )
}

export default HotelDetail;