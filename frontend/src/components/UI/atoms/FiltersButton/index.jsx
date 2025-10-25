import { useLocation } from 'react-router';

import { Grid } from 'antd';

import FiltersIcon from '@/assets/icons/Filters.svg?react';

import styles from './FiltersButton.module.scss';

const { useBreakpoint } = Grid;

const HomeButton = ({ size = 'md' }) => {
    const { pathname } = useLocation();
    const screens = useBreakpoint();

    if (!pathname.startsWith('/search') || screens.md) return null;

    return (
        <button
            className={`${styles.filtersBtn} ${styles[`${size}Size`]}`}
            onClick={() => {}}>
            <FiltersIcon />
        </button>
    )
}

export default HomeButton;