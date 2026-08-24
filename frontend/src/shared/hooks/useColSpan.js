import { useMemo } from 'react';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

const BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const TOTAL_COLUMNS = 24;

const CARDS_PER_ROW_THRESHOLD = 6;
const MAX_VISIBLE_ROWS = 3;
const MIN_VISIBLE_ROWS = 2;

export const colLayoutConfig = {
    small: { xs: 12, sm: 8, md: 8, lg: 6, xl: 6, xxl: 6},
    medium: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 4 },
    large: { xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6 },
}

const getInitialBreakpoint = () => {
    if (typeof window === 'undefined') return 'xs';
    const width = window.innerWidth;

    if (width >= 1600) return 'xxl';
    if (width >= 1200) return 'xl';
    if (width >= 992) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 576) return 'sm';

    return 'xs';
}

export const useColSpan = (variant = 'medium') => {
    const screens = useBreakpoint();

    return useMemo(() => {
        const colProps = colLayoutConfig[variant] || colLayoutConfig.medium;

        const hasScreens = Object.keys(screens).length > 0;

        const currentBreakpoint = hasScreens
            ?  BREAKPOINTS.find((key) => screens[key]) || 'xs'
            : getInitialBreakpoint();

        const colSpan = colProps[currentBreakpoint];

        const cardPerRow = TOTAL_COLUMNS / colSpan;

        const aboveTheFoldRows = cardPerRow >= CARDS_PER_ROW_THRESHOLD
            ? MAX_VISIBLE_ROWS
            : MIN_VISIBLE_ROWS;

        const aboveTheFoldCount = cardPerRow * aboveTheFoldRows;

        return { colSpan, aboveTheFoldCount };
    }, [variant, screens]);
}