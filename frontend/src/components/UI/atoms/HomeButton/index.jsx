import { useNavigate, useLocation } from 'react-router';

import { Grid } from 'antd';

import BackIcon from '@/assets/icons/Back.svg?react';

import styles from './HomeButton.module.scss';

const { useBreakpoint } = Grid;

const HomeButton = ({ size = 'md' }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const screens = useBreakpoint();

    if (!pathname.startsWith('/search') || screens.md) return null;

    return (
        <button
            className={`${styles.homeBtn} ${styles[`${size}Size`]}`}
            onClick={() => navigate('/home')}>
            <BackIcon />
        </button>
    )
}

export default HomeButton;