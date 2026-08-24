import { useRef } from 'react';
import { NavLink } from 'react-router';

import { useUIStore, selectIsMobile, selectIsHeaderCollapsed } from '@/shared/model/uiStore';

import { navItemConfig, getNavItemStyles} from './navItem.config.js';
import { LottieIcon } from '../LottieIcon/index.jsx';

import styles from './NavItem.module.scss'

export const NavItem = ({ route, index }) => {
    const isMobile = useUIStore(selectIsMobile);
    const isHeaderCollapsed = useUIStore(selectIsHeaderCollapsed);

    const lottieRef = useRef(null);

    const handleClick = () => {
        if (!lottieRef.current) return;
        lottieRef.current.play();
    };

    const itemConfig = navItemConfig[route.id];

    const { itemStyles, skeletonStyles, lottieStyles } = getNavItemStyles({
        itemConfig,
        baseSize: route.iconSize,
        isMobile,
        isHeaderCollapsed
    });

    const setLinkClasses = (isActive) => ([
        styles.link,
        route.id,
        isActive && styles.active,
    ].filter(Boolean).join(' '))


    return (
        <div
            className={styles.navItem}
            style={{
                width: isMobile ? `${route.width.mob}px` : `${route.width.desk}px`,
                '--item-index': index,
                ...itemStyles
            }}
        >
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