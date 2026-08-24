import { Row, Col } from 'antd';
import { HotelCard } from '../HotelCard';

export const HotelsList = ({
    hotels,
    search,
    dates,

    colSpan,
    criticalImagesCount,

    ...cardProps
}) => {
    return (
        <Row gutter={16}>
            {hotels.map((hotel, index) => (
                <Col
                    key={hotel.id}
                    span={colSpan}
                    data-reload-anchor
                >
                    <HotelCard
                        isFirst={index === 0}
                        isCriticalImage={index < criticalImagesCount}

                        hotel={hotel}
                        search={search}
                        dates={dates}

                        {...cardProps}
                    />
                </Col>
            ))}
        </Row>
    )
}