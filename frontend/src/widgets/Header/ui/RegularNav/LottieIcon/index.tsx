import { forwardRef, useEffect, useState } from 'react';
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react';

import { useIntroContext, type NavRoute } from '../../../model';
import type { NavItemConfig, NavItemStyles } from '../navItem.config'
import styles from './LottieIcon.module.scss';

interface LottieIconProps {
    route: NavRoute;
    speed: NavItemConfig['speed'];
    lottieStyles: NavItemStyles['lottieStyles'];
    skeletonStyles: NavItemStyles['skeletonStyles'];
}

export const LottieIcon = forwardRef<DotLottie, LottieIconProps>(({
    route,
    speed,
    lottieStyles,
    skeletonStyles
}: LottieIconProps, ref) => {
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

    const { handleLottieLoad } = useIntroContext();

    useEffect(() => {
        if (!dotLottie) return;

        const handleReady = () => handleLottieLoad()
        const handleComplete = () => dotLottie.setFrame(0);

        dotLottie.addEventListener('ready', handleReady);
        dotLottie.addEventListener('complete', handleComplete);

        return () => {
            dotLottie.removeEventListener('ready', handleReady);
            dotLottie.removeEventListener('complete', handleComplete);
        }
    }, [dotLottie, handleLottieLoad]);

    const dotLottieRefCallback = (instance: DotLottie) => {
        setDotLottie(instance);

        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <div className={styles.lottieWrapper}>
            <div className={styles.lottieSkeleton} style={skeletonStyles} />

            <div className={styles.lottie} style={lottieStyles}>
                <DotLottieReact
                    dotLottieRefCallback={dotLottieRefCallback}
                    src={route.animationPath}
                    speed={speed ?? 1}
                    loop={false}
                    autoplay={false}
                    renderConfig={{
                        devicePixelRatio: window.devicePixelRatio || 1,
                    }}
                />
            </div>
        </div>
    );
})