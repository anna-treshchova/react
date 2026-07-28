import { Row, Col } from 'antd';

import { HotelsListSkeleton } from '../HotelsListSkeleton';
import { HotelCard } from '../HotelCard';
import { colLayoutConfig } from '../../model/layout.config.js';

export const HotelsList = ({
    hotels,
    search,
    dates,
    variant = 'medium',
    renderToggleWishlistButton,
    emptyStateCard,
    shouldShowSkeleton = false,
    children,
}) => {
    const colProps = colLayoutConfig[variant] || colLayoutConfig.medium;

    const hasHotels = Array.isArray(hotels) && hotels.length > 0;
    const isEmpty = Array.isArray(hotels) && hotels.length === 0;

    const renderListContent = () => {
        if (shouldShowSkeleton) {
            return <HotelsListSkeleton variant={variant} />
        }

        if (isEmpty && emptyStateCard) {
            return (
                <Row gutter={16}>
                    <Col {...colProps}>
                        {emptyStateCard}
                    </Col>
                </Row>
            )
        }

        if (hasHotels) {
            return (
                <Row gutter={16}>
                    {hotels?.map((hotel, index) => (
                        <Col key={hotel.id} {...colProps}>
                            <HotelCard
                                index={index}
                                hotel={hotel}
                                search={search}
                                dates={dates}
                                renderToggleWishlistButton={renderToggleWishlistButton}
                            />
                        </Col>
                    ))}
                </Row>
            )
        }

        return null;
    }

    return (
        <div>
            {renderListContent()}
            {children}
        </div>
    )
}


