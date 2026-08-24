import { Row, Col } from 'antd';

import { useColSpan } from '@/shared/hooks/useColSpan';
import { getScrollRestorationMeta } from '@/shared/lib/scroll';

import { HotelCardSkeleton } from '../HotelCardSkeleton';

export const HotelsListSkeleton = ({ variant = 'medium' }) => {
    const { colSpan, aboveTheFoldCount } = useColSpan(variant);
    const { count, top } = getScrollRestorationMeta() || {};

    if (count === 0) return null;

    const skeletonsCount = count ?? aboveTheFoldCount;
    const skeletons = Array.from({ length: skeletonsCount });

    return (
        <div style={top ? { marginTop: `${top}px` } : {}}>
            <Row gutter={16}>
                {skeletons.map((_, index) => (
                    <Col key={index} span={colSpan}>
                        <HotelCardSkeleton />
                    </Col>
                ))}
            </Row>
        </div>
    )
}