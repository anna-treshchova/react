import { useSelector, useDispatch } from 'react-redux';

import { fetchHotelsPage } from '@/store/thunks/hotelsThunk.js';

import { Pagination, ConfigProvider } from 'antd';

import './ListPagination.module.scss';

const ListPagination = () => {
    const dispatch = useDispatch();
    const { items, total, page} = useSelector((state) => state.hotels);
    const {destination, guests, pets } = useSelector((state) => state.filters);

    const handlePageChange = (newPage) => {
        dispatch(fetchHotelsPage({
            page: newPage,
            destinationId: destination.id,
            guests,
            pets
        }));
    }

    return (
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
    )
}

export default ListPagination;