import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import HotelCard from './components/HotelCard';

const HotelList = () => {
    const hotels = useSelector((state) => state.hotels.items);

    return (
        <Row gutter={16} justify='center' style={{ padding: '50px 50px 90px', }}>
            {hotels.map((hotel) => (
                <Col xs={24} sm={12} lg={8} xl={4} key={hotel.id} >
                    <HotelCard hotel={hotel} />
                </Col>
            ))}
        </Row>

    )
}

export default HotelList;