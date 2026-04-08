import { useEffect, forwardRef } from 'react';
import Lottie from 'lottie-react';
import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import styles from './LottieIcon.module.scss'

const getIconStyles = (offsets, baseSize, isMobile, mode) => {
    const margins = isMobile ? offsets.margins.mobile : offsets.margins.desktop;

    const size = isMobile
        ? mode === 'expanded'
            ? baseSize - 15
            : baseSize - 5
        : baseSize;

    return {
        width: size,
        height: size,
        marginTop: margins?.mt ?? 0,
        marginRight: margins?.mr ?? 0,
        marginBottom: margins?.mb ?? 0,
        marginLeft: margins?.ml ?? 0,
    };
};

const LottieIcon = forwardRef(({ route, offsets, handleComplete }, ref) => {
    const mode = useLayoutStore(state => state.mode);
    const isMobile = useLayoutStore(state => state.isMobile);

    useEffect(() => {
        if (ref?.current && offsets?.speed) {
            ref.current.setSpeed(offsets.speed);
        }
    }, [ref, offsets?.speed]);

    const iconStyles = getIconStyles(offsets,route.iconSize, isMobile, mode);

    return (
        <div className={styles.icon} style={iconStyles}>
            <Lottie
                lottieRef={ref}
                animationData={route.animation}
                loop={false}
                autoplay={false}
                onComplete={handleComplete}
            />
        </div>
    )
})

export default LottieIcon;