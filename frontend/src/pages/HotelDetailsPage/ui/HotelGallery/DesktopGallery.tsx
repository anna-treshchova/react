import { forwardRef } from 'react';
import { Col, Row, type GetProps } from 'antd';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import type { HotelDetails } from '@/entities/hotels';
import styles from './DesktopGallery.module.scss';

type RowGutter = GetProps<typeof Row>['gutter'];

const gutter: RowGutter = { md: 4, lg: 8 };

interface DesktopGalleryProps {
    images: HotelDetails['images'];
}

export const DesktopGallery = forwardRef<
    HTMLDivElement,
    DesktopGalleryProps
>(({ images }, ref) => {
    return (
        <div ref={ref} className={styles.hotelGallery}>
            <Row gutter={gutter} style={{ height: '100%' }}>
                <Col md={12}>
                    <OptimizedImage
                        src={images[0]}
                        variant='galleryMain'
                        fetchPriority='high'
                    />
                </Col>
                <Col md={12} className={styles.rightSideContainer}>
                    <Row gutter={gutter} style={{ height: '50%' }}>
                        <Col md={12}>
                            <OptimizedImage src={images[1]} variant='gallerySecondary'/>
                        </Col>
                        <Col md={12}>
                            <OptimizedImage src={images[2]} variant='gallerySecondary' />
                        </Col>
                    </Row>
                    <Row gutter={gutter} style={{ height: '50%' }}>
                        <Col md={12}>
                            <OptimizedImage src={images[3]} variant='gallerySecondary' />
                        </Col>
                        <Col md={12}>
                            <OptimizedImage src={images[4]} variant='gallerySecondary' />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
});


////////// interface HotelDetailsProps {
// // // // //     id={hotel.id}
// // // // // name={hotel.name}
// // // // // isFavorite={hotel.favorite}
// // // // // checkAuth={checkAuth}
// // // // // }
// // // //
// // // // //
// // // // // export interface HotelDetails {
// // // // //     id: string;
// // // // //     name: string;
// // // // //     address: string;
// // // // //     city: string;
// // // // //     state: string;
// // // // //     country_code: string;
// // // // //     rating: number,
// // // // //     price_per_night: number,
// // // // //     images: string[],
// // // // //     details: Details;
// // // // //     amenities: string[];
// // // // //     favorite: boolean,
// // // // // }
// // // // //
// // // // // export interface HotelDetailsResponse {
// // // // //     hotel: HotelDetails;
// // // // // }
// //
// // //interface Details {
// // //     max_guests: number;
// // //     bedrooms: number;
// // //     beds: number,
// // //     baths: number;
// // // }
// // //
// // // export interface HotelDetails {
// // //     id: string;
// // //     name: string;
// // //     address: string;
// // //     city: string;
// // //     state: string;
// // //     country_code: string;
// // //     rating: number,
// // //     price_per_night: number,
// // //     images: string[],
// // //     details: Details;
// // //     amenities: string[];
// // //     favorite: boolean,
// // // }