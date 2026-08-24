import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import styles from './DesktopGallery.module.scss';

import { EMPTY_ARRAY } from '@/shared/constants/empty';

export const DesktopGallery = forwardRef(({ images = EMPTY_ARRAY }, ref) => {
    const gutter = { md: 4, lg: 8 };

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

DesktopGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
}