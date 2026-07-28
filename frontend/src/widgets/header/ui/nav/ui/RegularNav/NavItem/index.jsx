import { useRef } from 'react';
import { NavLink } from 'react-router';
import { useLayoutStore, selectIsMobile } from '@/shared/model';
import { LottieIcon } from '../LottieIcon';
import styles from './NavItem.module.scss'

const ICON_OFFSETS = {
    homes: {
        speed: 3,
        margins: {
            mobile: { mb: 2, mr: 0 },
            desktop: { mb: 4, mr: -6 }
        }
    },
    experiences: {
        speed: 2,
        margins: {
            mobile: { mb: 0, mr: 0},
            desktop: { mb: 0, mr: -10},
        }
    },
    services: {
        speed: 1,
        margins: {
            mobile: { mb: 6, mr: 0 },
            desktop: { mb: 6, mr: -2 },
        }
    }
}

const NavItem = ({ route }) => {
    const isMobile = useLayoutStore(selectIsMobile);

    const lottieRef = useRef(null);

    const offsets = ICON_OFFSETS[route.id];

    const handleClick = () => {
        if (!lottieRef.current) return;
        lottieRef.current.play();
    };

    const handleComplete = () => {
        if (!lottieRef.current) return;
        lottieRef.current.goToAndStop(0, true);
    };

    const setLinkClasses = (isActive) => ([
        styles.link,
        route.id,
        isActive && styles.active,
    ].filter(Boolean).join(' '))

    const ml = (!isMobile && route.id === 'experiences') ? '-4px' : '0px'

    return (
        <NavLink
            to={route.path}
            onClick={handleClick}
            className={({ isActive }) => setLinkClasses(isActive)}
            style={{
                '--mobile-width': isMobile ? `${route.mobileWidth}px` : 'auto',
                marginLeft: ml,
            }}
        >
           <LottieIcon
               ref={lottieRef}
               route={route}
               offsets={offsets}
               handleComplete={handleComplete}
           />
            <span>{route.label}</span>
        </NavLink>
    )
}

export default NavItem;