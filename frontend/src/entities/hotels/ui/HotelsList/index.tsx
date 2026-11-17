import { Row, Col } from 'antd';
import { HotelCard } from '../HotelCard';
import type { Hotel } from '../../model';
import type { HotelCardProps } from '../HotelCard';

export type HotelListProps = {
    hotels: Hotel[];
    cardImageSizeVariant: HotelCardProps['imageSizeVariant'];
    colSpan: number;
    criticalImagesCount: number;
} & Omit<
    HotelCardProps,
    'isFirst' | 'isCriticalImage' | 'hotel' | 'imageSizeVariant'
>;

export const HotelsList = ({
    hotels,
    search,
    dates,
    cardImageSizeVariant,

    colSpan,
    criticalImagesCount,

    ...cardProps
}: HotelListProps) => {
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
                        imageSizeVariant={cardImageSizeVariant}

                        {...cardProps}
                    />
                </Col>
            ))}
        </Row>
    )
}