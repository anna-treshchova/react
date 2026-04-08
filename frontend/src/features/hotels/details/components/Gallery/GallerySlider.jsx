import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './GallerySlider.module.scss';

const GallerySlider = ({ images }) => {
    return (
        <div style={{position: 'relative'}}>
            <Swiper
                className={styles.slider}
                modules={[Pagination]}
                slidesPerView={1}
                pagination={{ type: 'fraction'}}
                spaceBetween={0}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={src}
                            alt=''
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

GallerySlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default GallerySlider;