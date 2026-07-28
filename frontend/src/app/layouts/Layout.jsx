import { AuthModal } from '@/features/auth';
import {
    useLayoutStore,
    useLayoutEffects,
    selectHasAppTransitions
} from '@/shared/model';

import { Header } from '@/widgets/header';
import { MainContent } from './MainContent';

import styles from './Layout.module.scss';

export const Layout = () => {
    useLayoutEffects();

    const hasAppTransitions = useLayoutStore(selectHasAppTransitions);

    return (
        <div
            className={styles.layout}
            data-transitions-disabled={!hasAppTransitions}
        >
            <Header />
            <MainContent />
            <AuthModal />
        </div>
    )
}