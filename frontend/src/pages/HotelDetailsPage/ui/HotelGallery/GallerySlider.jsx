import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { OptimizedImage } from '@/shared/ui/OptimizedImage';

import styles from './GallerySlider.module.scss';

export const GallerySlider = ({ images = [] }) => {
    return (
        <div style={{position: 'relative'}}>
            <Swiper
                className={styles.slider}
                modules={[Pagination]}
                slidesPerView={1}
                pagination={{ type: 'fraction'}}
                spaceBetween={0}
            >
                {images.map((src, index) => {
                    const isFirst = index === 0;

                    return (
                        <SwiperSlide key={index}>
                            <OptimizedImage
                                src={src}
                                variant={isFirst ? 'galleryMain' : 'gallerySecondary'}
                                loading={isFirst ? 'eager' : 'lazy'}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

GallerySlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
}