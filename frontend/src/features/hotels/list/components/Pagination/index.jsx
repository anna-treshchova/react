import { useNavigate, useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';

import { PAGE_SIZE } from '@/features/hotels/model/pagination.constants.js';

import { Pagination, ConfigProvider } from 'antd';
import './HotelsPagination.module.scss';

const paginationTheme = {
    token: { colorBgTextHover: '#f7f7f7' },
    components: {
        Pagination: {
            itemActiveBg: '#222222',
            itemBg: 'transparent',
            itemSize: 32,
        }
    }
}

const HotelsPagination = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;

    const { total } = useSelector((state) => state.hotels);

    const handlePageChange = (newPage) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('page', newPage);

        navigate({ search: `?${nextParams}`})
    }

    return (
        <ConfigProvider theme={paginationTheme}>
            {total > PAGE_SIZE && (
                <Pagination
                    current={page}
                    total={total}
                    pageSize={PAGE_SIZE}
                    showSizeChanger={false}
                    showLessItems
                    onChange={handlePageChange}
                />
            )}
        </ConfigProvider>
    )
}

export default HotelsPagination;