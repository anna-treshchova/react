import { forwardRef, useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { useLayoutStore, selectIsHeaderCollapsed, selectIsMobile } from '@/shared/model';

import styles from './LottieIcon.module.scss'

const getIconStyles = ({ offsets, baseSize, isMobile, isHeaderCollapsed }) => {
    const margins = isMobile ? offsets.margins.mobile : offsets.margins.desktop;

    const size = isMobile
        ? !isHeaderCollapsed
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

export const LottieIcon = forwardRef(({ route, offsets, handleComplete }, ref) => {
    const isHeaderCollapsed = useLayoutStore(selectIsHeaderCollapsed);
    const isMobile = useLayoutStore(selectIsMobile);

    const iconStyles = getIconStyles({
        offsets,
        baseSize: route.iconSize,
        isMobile,
        isHeaderCollapsed
    });

    const [dotLottie, setDotLottie] = useState(null);

    // 1. Правильно реєструємо подію onComplete
    useEffect(() => {
        if (dotLottie && handleComplete) {
            dotLottie.addEventListener('complete', handleComplete);

            // Очищення слухача при розмонтуванні
            return () => dotLottie.removeEventListener('complete', handleComplete);
        }
    }, [dotLottie, handleComplete]);

    // 2. Правильно обробляємо ref
    const dotLottieRefCallback = (instance) => {
        setDotLottie(instance); // Зберігаємо для локального useEffect

        // Безпечно синхронізуємо з батьківським компонентом (NavList/NavItem)
        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <div className={styles.icon} style={iconStyles}>
            <DotLottieReact
                dotLottieRefCallback={dotLottieRefCallback}
                src={route.animationPath}
                speed={offsets?.speed ?? 1}
                loop={false}
                autoplay={false}
                renderConfig={{
                    devicePixelRatio: window.devicePixelRatio,
                }}
            />
        </div>
    );
})