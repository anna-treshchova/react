import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import HotelCard from './components/HotelCard/index.jsx';

import styles from './ResultsList.module.scss';

const ResultsList = () => {
    const hotels = useSelector((state) => state.hotels.items);

    return (
        <Row gutter={16} justify='center' className={styles.resultList}>
            {hotels.map((hotel) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={hotel.id}>
                    <HotelCard hotel={hotel} />
                </Col>
            ))}
        </Row>

    )
}

export default ResultsList;