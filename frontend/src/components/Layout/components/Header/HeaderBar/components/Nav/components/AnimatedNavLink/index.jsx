import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router';

import Lottie from 'lottie-react';

import { Grid } from 'antd'

import styles from './AnimatedNavLink.module.scss'

const { useBreakpoint } = Grid;

const AnimatedNavLink = ({ route, isSearchOpen }) => {
    const lottieRef = useRef(null);
    const screens = useBreakpoint();

    const isHome = route.label === 'Home';
    const isExp = route.label === 'Experiences';
    const isServ = route.label === 'Services';

    useEffect(() => {
        if (!lottieRef.current) return;

        if (isExp) {
            lottieRef.current.setSpeed(2);
        }

        if (isHome) {
            lottieRef.current.setSpeed(2.5);
        }
     }, []);

    const handleClick = () => {
        if (!lottieRef.current) return;
        lottieRef.current.play();
    };

    const handleComplete = () => {
        if (!lottieRef.current) return;
        lottieRef.current.goToAndStop(0, true);

    };

    const size = screens.md ? route.size : isSearchOpen ? (route.size - 5) : route.size

    const mb = screens.md
        ? isHome
            ? 2
            : isExp ? 0 : 4
        : isHome
            ? -2
            : isServ ? 0 : -4

    const ml = isExp ? -4 : 0


    return (
        <NavLink to={route.path}
                 onClick={handleClick}
                 className={({ isActive }) =>
                     `${isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}`
                 }
                 style={{ marginLeft: ml}}
        >
            <div
                className={styles.iconWrapper}
                style={{
                    width: size,
                    height: size,
                    marginBottom: mb,
                    marginRight: !screens.md ? 0 : isHome ? -6 : isExp ? -10 : -4,

                }}
            >
                <Lottie
                    lottieRef={lottieRef}
                    animationData={route.animation}
                    loop={false}
                    autoplay={false}
                    onComplete={handleComplete}
                />
            </div>
            <span>{route.label}</span>

        </NavLink>

    )
}

export default AnimatedNavLink;