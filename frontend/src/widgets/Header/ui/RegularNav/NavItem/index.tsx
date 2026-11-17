import { useRef } from 'react';
import { NavLink } from 'react-router';

import type { DotLottie } from '@lottiefiles/dotlottie-react';

import { useUIStore, selectIsMobile } from '@/shared/model/uiStore';
import { CSSPropertiesWithVars } from '@/shared/styles/types';

import { NavRoute } from '../../../model';
import { LottieIcon } from '../LottieIcon';
import { navItemConfig, getNavItemStyles } from '../navItem.config';
import styles from './NavItem.module.scss'

interface NavItemProps {
    route: NavRoute;
    index: number;
}

export const NavItem = ({ route, index }: NavItemProps) => {
    const isMobile = useUIStore(selectIsMobile);

    const lottieRef = useRef<DotLottie>(null);

    const handleClick = () => {
        if (!lottieRef.current) return;
        lottieRef.current.play();
    };

    const itemConfig = navItemConfig[route.id];

    const { itemStyles, skeletonStyles, lottieStyles } = getNavItemStyles(
        itemConfig,
        route.iconSize,
        isMobile,
    );

    const setLinkClasses = (isActive: boolean) => ([
        styles.link,
        route.id,
        isActive && styles.active,
    ].filter(Boolean).join(' '))


    const navItemStyle: CSSPropertiesWithVars = {
        width: isMobile ? `${route.width.mob}px` : `${route.width.desk}px`,
        '--item-index': index,
        ...itemStyles
    }

    return (
        <div className={styles.navItem} style={navItemStyle}>
            <NavLink
                to={route.path}
                onClick={handleClick}
                className={({ isActive }) => setLinkClasses(isActive)}
            >
                <LottieIcon
                    ref={lottieRef}
                    route={route}
                    speed={itemConfig.speed}
                    lottieStyles={lottieStyles}
                    skeletonStyles={skeletonStyles}
                />
                <span className={styles.navLabel}>{route.label}</span>
            </NavLink>
        </div>
    )
}