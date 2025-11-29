import { useSelector } from 'react-redux';

import { Row, Col } from 'antd';

import HotelCard from './HotelCard';
import ListPagination from './Pagination';

import styles from './ResultsList.module.scss';

const ResultsList = () => {
    const { items } = useSelector((state) => state.search);

    return (
        <div className={styles.resultsContainer}>
            <Row gutter={16} justify='center' className={styles.resultList}>
                {items.map((hotel) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={hotel.id}>
                        <HotelCard hotel={hotel} />
                    </Col>
                ))}
            </Row>
            <ListPagination />
        </div>
    )
}

export default ResultsList;