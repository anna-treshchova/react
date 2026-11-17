import { Pagination as AntdPagination, ConfigProvider, type ThemeConfig } from 'antd';
import styles from './Pagination.module.scss';

type PaginationProps = {
    total: number;
    pageSize: number;
    currentPage: number;
    onChange: (newPage: number) => void;
}

const paginationThemeConfig = {
    token: { colorBgTextHover: '#f7f7f7' },
    components: {
        Pagination: {
            itemActiveBg: '#222222',
            itemBg: 'transparent',
            itemSize: 32,
        }
    }
} satisfies ThemeConfig;

export const Pagination = ({
    total,
    pageSize,
    currentPage,
    onChange
}: PaginationProps) => {
    return (
        <ConfigProvider theme={paginationThemeConfig}>
            <div className={styles.paginationWrapper}>
                <AntdPagination
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    showLessItems
                    onChange={onChange}
                />
            </div>
        </ConfigProvider>
    )
}
