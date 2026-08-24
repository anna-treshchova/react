import { useLayoutEffect } from 'react';
import { ScrollRestoration } from 'react-router';

import { useUIStore, selectHasAppTransitions } from '@/shared/model/uiStore';
import { getSavedScrollY, clearSavedScrollY } from '@/shared/lib/scroll';
import { getPageContext } from '@/shared/lib/page-context';
import { getHeaderTransformThreshold } from '@/shared/lib/header-metrics';
import { loadFromStorage } from '@/shared/lib/storage';

import { AuthModal } from '@/features/auth';

import { Header } from '@/widgets/Header';

import { MainContent } from './MainContent';

import styles from './Layout.module.scss';

export const Layout = () => {
    const hasAppTransitions = useUIStore(selectHasAppTransitions);

    useLayoutEffect(() => {
        const screen = useUIStore.getState().screen
        const { pageType } = getPageContext(window.location.pathname, window.location.search);
        const hasTopSlot = Boolean(loadFromStorage('recent_search'))

        const threshold = getHeaderTransformThreshold(screen, pageType, hasTopSlot);

        const savedScrollY = getSavedScrollY();

        if (savedScrollY > threshold) {
            window.scrollTo({ top: savedScrollY, behavior: 'instant' });
        } else {
            clearSavedScrollY();
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, []);

    return (
        <div
            className={styles.layout}
            data-no-transitions={!hasAppTransitions}
        >
            <Header />
            <MainContent />
            <AuthModal />
            <ScrollRestoration />
        </div>
    )
}