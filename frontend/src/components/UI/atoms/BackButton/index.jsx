import { useLocation } from 'react-router';

import { Grid } from 'antd';

import BackIcon from '@/assets/icons/Back.svg?react';

import styles from './BackButton.module.scss';

const { useBreakpoint } = Grid;

const BackButton = ({ size = 'md' }) => {
    const { pathname } = useLocation();
    const screens = useBreakpoint();

    if (!pathname.startsWith('/search') || screens.md) return null;

    return (
        <button
            className={`${styles.homeBtn} ${styles[`${size}Size`]}`}
            onClick={() => window.history.back()}>
            <BackIcon />
        </button>
    )
}

export default BackButton;