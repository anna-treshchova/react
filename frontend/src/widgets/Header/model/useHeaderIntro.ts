import {
    useCallback,
    useEffect,
    useRef,
    type Dispatch,
    type SetStateAction
} from 'react';

import { INTRO_STATUS, type IntroStatus } from '@/shared/hooks/useContentIntro';

import { navRoutesConfig } from './navRoutes.config';

interface HeaderIntroProps {
    introStatus: IntroStatus;
    setIntroStatus: Dispatch<SetStateAction<IntroStatus>>
}

export const useHeaderIntro = (
    { introStatus, setIntroStatus }: HeaderIntroProps
): () => void => {
    const loadedLottieCountRef = useRef(0);
    const introStatusRef = useRef(introStatus);
    const totalLottieCount = navRoutesConfig.length;

    const handleLottieLoad = useCallback(() => {
        if (introStatusRef.current !== INTRO_STATUS.PENDING) return;

        loadedLottieCountRef.current += 1;

        if (loadedLottieCountRef.current >= totalLottieCount) {
            setIntroStatus(INTRO_STATUS.READY);
        }
    }, [totalLottieCount, setIntroStatus]);

    useEffect(() => {
        if (introStatus !== INTRO_STATUS.PENDING) return;

        const timeoutId = setTimeout(() => {
            setIntroStatus(INTRO_STATUS.READY);
        }, 1000)

        return () => clearTimeout(timeoutId);
    }, [introStatus, setIntroStatus]);

    useEffect(() => {
        if (introStatus !== INTRO_STATUS.READY) return;

        const timeoutId = setTimeout(() => {
            setIntroStatus(INTRO_STATUS.DONE)
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [introStatus, setIntroStatus])

    return handleLottieLoad;
}