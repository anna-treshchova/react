import { navConfig } from '../../model/nav.config.js';
import styles from './NavSkeleton.module.scss';

export const NavSkeleton = () => {
    return (
        <>
            <div className={styles.compactNav}>
                { navConfig.map(route => (
                    <div key={route.id} className={styles.navItem}>
                        {route.label}
                    </div>
                ))}
            </div>

            <div className={styles.regularNav}>
                {navConfig.map(route => (
                    <div
                        key={route.id}
                        className={styles.navItem}
                        style={{
                            '--mob-width': `${route.width.mob}px`,
                            '--desk-width': `${route.width.desk}px`
                        }}
                    >
                        <span className={styles.icon} />
                        <span className={styles.label}>
                        {route.label}
                    </span>
                    </div>
                ))}
            </div>
        </>
    )
}


