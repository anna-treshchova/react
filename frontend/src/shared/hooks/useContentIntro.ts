import {
    useRef,
    useEffect,
    useCallback,
    type Dispatch,
    type SetStateAction,
} from 'react';
import { useOutletContext } from 'react-router';

export const INTRO_STATUS = {
    PENDING: 'pending',
    READY: 'ready',
    DONE: 'done'
} as const;

export type IntroStatus = typeof INTRO_STATUS[keyof typeof INTRO_STATUS];

export type IntroOutletContext = {
    introStatus: IntroStatus;
    setIntroStatus: Dispatch<SetStateAction<IntroStatus>>;
}

type ContentIntroProps =  {
    items: object[] | undefined;
    aboveTheFoldCount: number;
}

type ContentIntroReturn = {
    criticalImagesCount: number;
    handleImageLoad: () => void;
}

export const useContentIntro = (
    { items, aboveTheFoldCount }: ContentIntroProps
): ContentIntroReturn => {
    const { introStatus, setIntroStatus } = useOutletContext<IntroOutletContext>();

    const loadedImagesCountRef = useRef(0);
    const introStatusRef = useRef(introStatus);

    useEffect(() => {
        introStatusRef.current = introStatus;
    }, [introStatus]);

    const criticalImagesCount = items?.length
        ? Math.min(aboveTheFoldCount, items.length)
        : 0

    const handleImageLoad = useCallback(() => {
        if (introStatusRef.current !== INTRO_STATUS.PENDING) return;

        loadedImagesCountRef.current += 1;

        if (loadedImagesCountRef.current >= criticalImagesCount) {
            setIntroStatus(INTRO_STATUS.READY);
        }
    }, [criticalImagesCount, setIntroStatus]);

    useEffect(() => {
        if (aboveTheFoldCount === 0 || introStatus !== INTRO_STATUS.PENDING) return;

        const timeoutId = setTimeout(() => {
            setIntroStatus(INTRO_STATUS.READY);
        }, 1500)

        return () => clearTimeout(timeoutId);
    }, [aboveTheFoldCount, introStatus, setIntroStatus]);

    useEffect(() => {
        if (introStatus !== INTRO_STATUS.READY) return;

        const timeoutId = setTimeout(() => {
            setIntroStatus(INTRO_STATUS.DONE)
        }, 1500)

        return () => clearTimeout(timeoutId)
    }, [introStatus, setIntroStatus])

    return { criticalImagesCount, handleImageLoad }
}