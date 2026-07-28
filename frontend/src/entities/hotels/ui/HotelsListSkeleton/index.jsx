import { Row, Col } from 'antd';
import { colLayoutConfig } from '../../model/layout.config.js';
import { HotelCardSkeleton } from '../HotelCardSkeleton';

export const HotelsListSkeleton = ({ variant = 'medium' }) => {
    const length = variant === 'large' ? 2 : 18;

    const skeletons = Array.from({ length }, (_, i) => ({ id: `skeleton-${i}` }))

    const colProps = colLayoutConfig[variant] || colLayoutConfig.medium;

    return (
        <Row gutter={16}>
            {skeletons.map(s => (
                <Col key={s.id} {...colProps}>
                    <HotelCardSkeleton />
                </Col>
            ))}
        </Row>
    )
}