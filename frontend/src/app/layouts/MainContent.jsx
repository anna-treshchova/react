import { Outlet } from 'react-router';

import {
    useLayoutStore,
    selectScreen,
    selectIsHub,
    selectIsMainContentLifted,
    selectHasMainContentTransitions,
} from '@/shared/model';

import styles from './MainContent.module.scss';

export const MainContent = () => {
    const screen = useLayoutStore(selectScreen);
    const isHub = useLayoutStore(selectIsHub);
    const isLifted = useLayoutStore(selectIsMainContentLifted);
    const hasMainContentTransitions = useLayoutStore(selectHasMainContentTransitions);

    return (
        <main
            className={styles.main}
            data-lifted={isLifted}
            data-screen={screen}
            data-hub={isHub}
            data-transitions-disabled={!hasMainContentTransitions}
        >
            <Outlet />
        </main>
    )
}
