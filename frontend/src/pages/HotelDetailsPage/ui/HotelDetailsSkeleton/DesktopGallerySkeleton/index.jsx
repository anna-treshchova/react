import { Col, Row } from 'antd';
import styles from './DesktopGallerySkeleton.module.scss'

export const DesktopGallerySkeleton = () => {
    const gutter = { md: 4, lg: 8 };

    return (
        <div className={styles.hotelGallery}>
            <Row gutter={gutter} style={{ height: '100%' }}>
                <GalleryCell />
                <Col md={12} className={styles.rightSideContainer}>
                    <Row gutter={gutter} className={styles.rightRow}>
                        <GalleryCell />
                        <GalleryCell />
                    </Row>
                    <Row gutter={gutter} className={styles.rightRow}>
                        <GalleryCell />
                        <GalleryCell />
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

const GalleryCell = () => (
    <Col md={12}>
        <div className={styles.cell} />
    </Col>
)

