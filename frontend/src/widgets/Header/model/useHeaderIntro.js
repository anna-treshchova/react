import { useCallback, useEffect, useRef } from 'react';
import { navConfig } from './nav.config';

const INTRO_STATUS = {
    PENDING: 'pending',
    READY: 'ready',
    DONE: 'done'
}

export const useHeaderIntro = ({ introStatus, setIntroStatus }) => {
    const loadedLottieCountRef = useRef(0);
    const introStatusRef = useRef(introStatus);
    const totalLottieCount = navConfig.length;

    useEffect(() => {
        introStatusRef.current = introStatus;
    }, [introStatus]);

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

//import { useCallback, useEffect, useRef } from 'react';
//
// // Імпортуємо глобальний стейт із shared
// import { useUIStore, selectHeaderIntroStatus, selectUIActions } from '@/shared/model/uiStore';
// // Спокійно імпортуємо конфіг, бо ми в одному віджеті!
// import { navRoutesConfig } from '../config/navRoutes.config';
//
// export const useHeaderIntroOrchestrator = () => {
//     const introStatus = useUIStore(selectHeaderIntroStatus);
//     const { setHeaderIntroStatus } = useUIStore(selectUIActions);
//
//     const loadedLottiesCountRef = useRef(0);
//     const introStatusRef = useRef(introStatus);
//     const totalLottiesCount = navRoutesConfig.length; // Просто беремо довжину масиву!
//
//     // Синхронізація актуального статусу для колбеку
//     useEffect(() => {
//         introStatusRef.current = introStatus;
//     }, [introStatus]);
//
//     // Колбек, який ми передамо в кожну LottieIcon
//     const handleLottieLoad = useCallback(() => {
//         if (introStatusRef.current !== 'pending') return;
//
//         loadedLottiesCountRef.current += 1;
//
//         if (loadedLottiesCountRef.current >= totalLottiesCount) {
//             setHeaderIntroStatus('ready');
//         }
//     }, [setHeaderIntroStatus, totalLottiesCount]);
//
//     // Запасний варіант (Safety timeout): якщо Lottie зламалися чи інтернет відпав
//     useEffect(() => {
//         if (introStatus !== 'pending') return;
//
//         const timeoutId = setTimeout(() => {
//             setHeaderIntroStatus('ready');
//         }, 1500); // Якщо за 1.5с не завантажились — показуємо примусово
//
//         return () => clearTimeout(timeoutId);
//     }, [introStatus, setHeaderIntroStatus]);
//
//     // Перехід у фінальний стан після програвання анімації
//     useEffect(() => {
//         if (introStatus !== 'ready') return;
//
//         const timeoutId = setTimeout(() => {
//             setHeaderIntroStatus('done');
//         }, 1500); // Даємо час на CSS-анімацію (popIn)
//
//         return () => clearTimeout(timeoutId);
//     }, [introStatus, setHeaderIntroStatus]);
//
//     return { handleLottieLoad };
// };