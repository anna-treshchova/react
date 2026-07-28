import { Pagination as AntdPagination, ConfigProvider } from 'antd';
import './Pagination.module.scss';

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

export const Pagination = ({ total, pageSize, currentPage, onChange }) => {
    return (
        <ConfigProvider theme={paginationTheme}>
            <AntdPagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                showSizeChanger={false}
                showLessItems
                onChange={onChange}
            />
        </ConfigProvider>
    )
}
