import HotelCard from './components/HotelCard';
import ListPagination from './components/Pagination';
import { useRecentSearchStore } from '@/shared/modal/useRecentSearchStore.js';

import { Row, Col } from 'antd';
import styles from './HotelsList.module.scss';

const HotelsList = ({ hotels }) => {
    const recentSearch = useRecentSearchStore((state) => state.recentSearch);
    const listShift = recentSearch ? 100 : 50;

    return (
        <div
            className={styles.hotels}
            style={{ '--list-shift': listShift }}
        >
            <Row gutter={16} justify='center' className={styles.hotelsList}>
                {hotels.map((hotel) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={hotel.id}>
                        <HotelCard hotel={hotel} />
                    </Col>
                ))}
            </Row>
            <ListPagination />
        </div>
    )
}

export default HotelsList;