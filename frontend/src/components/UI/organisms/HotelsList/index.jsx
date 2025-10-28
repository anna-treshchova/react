import { useSelector, useDispatch } from 'react-redux';

import { getHotelsPage, getFilteredHotelsPage } from '@/store/thunks/hotelsThunk.js';

import { Row, Col, Pagination, ConfigProvider } from 'antd';

import HotelCard from './HotelCard';

import styles from './ResultsList.module.scss';

const ResultsList = () => {
    const dispatch = useDispatch();
    const { items, total, page, mode, filters } = useSelector((state) => state.hotels);

    const handlePageChange = (newPage) => {
        if (mode === 'all') {
            dispatch(getHotelsPage(newPage));
        } else {
            dispatch(getFilteredHotelsPage({
                ...filters,
                page: newPage,
            }));
        }
    }

    return (
        <div className={styles.resultsContainer}>
            <Row gutter={16} justify='center' className={styles.resultList}>
                {items.map((hotel) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={hotel.id}>
                        <HotelCard hotel={hotel} />
                    </Col>
                ))}
            </Row>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgTextHover: '#f7f7f7',
                    },
                    components: {
                        Pagination: {
                            itemActiveBg: '#222222',
                            itemBg: 'transparent',
                            itemSize: 32,
                        }
                    }
                }}
            >

                {items.length > 0 && (
                    <Pagination
                        current={page}
                        total={total}
                        pageSize={18}
                        showSizeChanger={false}
                        showLessItems
                        onChange={handlePageChange}
                    />
                )}
            </ConfigProvider>

        </div>

    )
}

export default ResultsList;