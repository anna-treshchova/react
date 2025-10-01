import { Col, Row } from 'antd';

import styles from './Gallery.module.scss';


const HotelHeader = ({ images }) => {
    return (
        <div className={styles.hotelGallery}>
            <Row gutter={8} style={{ height: '100%' }}>
                <Col lg={12}>
                    <img src={images[0]} alt=''/>
                </Col>
                <Col lg={12}>
                    <Row gutter={8} style={{ height: '50%' }}>
                        <Col lg={12}>
                            <img src={images[1]} alt=''/>
                        </Col>
                        <Col lg={12}>
                            <img src={images[2]} alt=''/>
                        </Col>
                    </Row>
                    <Row gutter={8} style={{ marginTop: '8px', height: '50%' }}>
                        <Col lg={12}>
                            <img src={images[3]} alt=''/>
                        </Col>
                        <Col lg={12}>
                            <img src={images[4]} alt=''/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default HotelHeader;