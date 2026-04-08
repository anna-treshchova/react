import { Outlet } from 'react-router';
import { useLayoutStore } from './useLayoutStore.js';
import { LayoutWatcher } from './LayoutWatcher.jsx';

import Header from './components/Header';
import styles from './Layout.module.scss';

const Layout = () => {
    const {
        mode,
        isFloating,
        isOverlayActive,

        isHub,
        isDetails,
        isDisabled,

        screen,
        isNavOffscreen,
        areIconsOffscreen,

        noTransitions,
    } = useLayoutStore();



    return (
        <div
            className={styles.layout}

            data-mode={mode}
            data-floating={isFloating}
            data-overlay={isOverlayActive}

            data-hub={isHub}
            data-view={isDetails ? 'details' : 'default'}
            data-disabled={isDisabled}

            data-screen={screen}
            data-nav-offscreen={isNavOffscreen}
            data-icons-offscreen={areIconsOffscreen}

            data-no-transitions={noTransitions}
        >
            <LayoutWatcher />
            <Header />
            <main
                className={styles.main}
            >
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;