import { useSelector, useDispatch } from 'react-redux';

import { fetchSearchResults } from '@/store/thunks/searchThunk.js';

import { PAGE_SIZE } from '@/constants/pagination.js';

import { Pagination, ConfigProvider } from 'antd';

import './ListPagination.module.scss';

const ListPagination = () => {
    const dispatch = useDispatch();
    const { total, page } = useSelector((state) => state.search);
    const { destination, guests, pets } = useSelector((state) => state.filters);

    const handlePageChange = (newPage) => {
        dispatch(fetchSearchResults({
            page: newPage,
            destinationId: destination.id,
            guests,
            pets
        }));
    }

    return (
        <ConfigProvider
            theme={{
                token: { colorBgTextHover: '#f7f7f7' },
                components: {
                    Pagination: {
                        itemActiveBg: '#222222',
                        itemBg: 'transparent',
                        itemSize: 32,
                    }
                }
            }}
        >
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

export default ListPagination;