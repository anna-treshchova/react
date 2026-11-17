import { CSSPropertiesWithVars } from '@/shared/styles/types';
import { navRoutesConfig } from '../../model';
import styles from './NavSkeleton.module.scss';

export const NavSkeleton = () => {
    return (
        <>
            <div className={styles.compactNav}>
                { navRoutesConfig.map(route => (
                    <div key={route.id} className={styles.navItem}>
                        {route.label}
                    </div>
                ))}
            </div>

            <div className={styles.regularNav}>

                {navRoutesConfig.map(route => {
                    const routeStyle: CSSPropertiesWithVars = {
                        '--mob-width': `${route.width.mob}px`,
                        '--desk-width': `${route.width.desk}px`
                    }

                    return (
                        <div
                            key={route.id}
                            className={styles.navItem}
                            style={routeStyle}
                        >
                            <span className={styles.icon} />
                            <span className={styles.label}>{route.label}</span>
                        </div>
                    )
                })}

            </div>
        </>
    )
}


