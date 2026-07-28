import { NAV_ROUTES } from '../../model/navigation.constants.js';
import styles from './NavSkeleton.module.scss';

export const NavSkeleton = () => {
    return (
        <nav className={styles.nav}>
            {NAV_ROUTES.map(route => (
                <div key={route.id} className={styles.navItem}>
                    <span className={styles.icon} />
                    <span className={styles.label}>
                        {route.label}
                    </span>
                </div>
            ))}
        </nav>
    )
}