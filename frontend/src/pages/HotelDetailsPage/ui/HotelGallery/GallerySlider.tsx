import { forwardRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { OptimizedImage } from '@/shared/ui/OptimizedImage';

import type { HotelDetails } from '@/entities/hotels';

import styles from './GallerySlider.module.scss';

interface GallerySliderProps {
    images: HotelDetails['images'];
}

export const GallerySlider = forwardRef<
    HTMLDivElement,
    GallerySliderProps
>(({ images }, ref) => {
    return (
        <div ref={ref} style={{position: 'relative'}}>
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
                                fetchPriority={isFirst ? 'high' : 'low'}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
});