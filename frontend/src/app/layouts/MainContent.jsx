import {useLayoutEffect, useRef, useState} from 'react';
import { Outlet } from 'react-router';

import { usePageContext } from '@/shared/hooks/usePageContext';
import { useUIStore, selectIsMainContentLifted } from '@/shared/model/uiStore';
import { hasHeaderPassedTransformThreshold } from '@/shared/lib/header-metrics';

import { useRecentSearchStore } from '@/features/recentSearch';

import styles from './MainContent.module.scss';

export const MainContent = () => {
    const { isHub, pageType } = usePageContext();
    const isLifted = useUIStore(selectIsMainContentLifted);

    const [ introStatus, setIntroStatus ] = useState('pending'); //'pending' | 'ready' | 'done'

    const [hasPassedThreshold] = useState(() => {
        const screen = useUIStore.getState().screen;
        const hasTopSlot = Boolean(useRecentSearchStore.getState().recentSearch);

        return hasHeaderPassedTransformThreshold(screen, pageType, hasTopSlot );
    });

    const mainRef = useRef(null);
    const isFirstRender = useRef(true);

    const shouldSkipIntro = hasPassedThreshold && introStatus !== 'done';

    useLayoutEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const element = mainRef.current;
        if (!element) return;

        element.dataset.noTransitions = 'true';

        const timeoutId = setTimeout(() => {
            delete element.dataset.noTransitions;
        }, 50)

        return () =>  clearTimeout(timeoutId);
    }, [isHub])

    return (
        <main
            ref={mainRef}
            className={styles.main}
            data-content-lifted={isLifted}
            data-hub={isHub}
            data-intro-status={introStatus}
            data-skip-intro={shouldSkipIntro}
        >
            <Outlet context={{ introStatus, setIntroStatus }} />
        </main>
    )
}