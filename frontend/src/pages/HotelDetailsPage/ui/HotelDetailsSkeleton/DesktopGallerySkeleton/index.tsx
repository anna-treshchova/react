import { Col, Row, type GetProps } from 'antd';
import styles from './DesktopGallerySkeleton.module.scss';

type RowGutter = GetProps<typeof Row>['gutter'];

const gutter: RowGutter = { md: 4, lg: 8 };

export const DesktopGallerySkeleton = () => {
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

