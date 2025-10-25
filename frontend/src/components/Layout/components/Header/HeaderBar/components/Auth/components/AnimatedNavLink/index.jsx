import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router';

import Lottie from 'lottie-react';

import { Grid } from 'antd'

import styles from './AnimatedNavLink.module.scss'

const { useBreakpoint } = Grid;

const AnimatedNavLink = ({ route, showForm }) => {
    const lottieRef = useRef(null);
    const screens = useBreakpoint();

    const isHomes = route.label === 'Homes';
    const isExp = route.label === 'Experiences';

    const mb = screens.md  //mb - marginBottom
        ? isHomes
            ? 0
            : 4
        : showForm
            ? isHomes
                ? -2
                : 2
            : isHomes
                ? -8
                : -2


    useEffect(() => {
        if (!lottieRef.current) return;

        if (isHomes) {  // ставимо анімацію на останній кадр
            const totalFrames = lottieRef.current.getDuration(true);
            lottieRef.current.goToAndStop(totalFrames, true);
        }
    }, []);

    const handleClick = () => {
        if (!lottieRef.current) return;

        if (isHomes) {
            lottieRef.current.setDirection(-1);
        }
        lottieRef.current.play();
    };

    const handleComplete = () => {
        if (!lottieRef.current) return;

        if (isHomes) {
            lottieRef.current.setDirection(1);
            lottieRef.current.play();
        } else {
            lottieRef.current.goToAndStop(0, true);
        }
    };

    return (
        <NavLink to={route.path}
                 onClick={handleClick}
                 className={({ isActive }) =>
                     `${isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}`
                 }
                 style={{ marginLeft: showForm ? 0 : isExp ? -6 : 0 }}
        >
            <div
                className={styles.iconWrapper}
                style={{
                    width: showForm ? (route.size - 10) : route.size,
                    height: showForm ? (route.size - 10) : route.size,
                    marginBottom: mb,
                    marginRight: isExp ? -4 : 0,
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