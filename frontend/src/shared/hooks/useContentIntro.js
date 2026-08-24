import { useCallback, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router';

const INTRO_STATUS = {
    PENDING: 'pending',
    READY: 'ready',
    DONE: 'done'
}

export const useContentIntro = ({ items, aboveTheFoldCount }) => {
    const { introStatus, setIntroStatus } = useOutletContext();

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