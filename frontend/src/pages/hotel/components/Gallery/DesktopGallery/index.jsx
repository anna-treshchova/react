import { Col, Row } from 'antd';

import styles from './DesktopGallery.module.scss';

const DesktopGallery = ({ images }) => {
    if (!images || images.length < 5) return null;

    return (
        <div className={styles.hotelGallery}>
            <Row gutter={8} style={{ height: '100%' }}>
                <Col md={12}><img src={images[0]} alt=''/></Col>
                <Col md={12}>
                    <Row gutter={8} style={{ height: '50%' }}>
                        <Col md={12}><img src={images[1]} alt=''/></Col>
                        <Col md={12}><img src={images[2]} alt=''/></Col>
                    </Row>
                    <Row gutter={8} style={{ marginTop: '8px', height: '50%' }}>
                        <Col md={12}><img src={images[3]} alt=''/></Col>
                        <Col md={12}><img src={images[4]} alt=''/></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default DesktopGallery;