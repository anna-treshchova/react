import { forwardRef, useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { useIntroContext } from '../../../model';
import styles from './LottieIcon.module.scss';

export const LottieIcon = forwardRef(({ route, speed, lottieStyles, skeletonStyles }, ref) => {
    const [dotLottie, setDotLottie] = useState(null);

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

    const dotLottieRefCallback = (instance) => {
        setDotLottie(instance);
        ref.current = instance;
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