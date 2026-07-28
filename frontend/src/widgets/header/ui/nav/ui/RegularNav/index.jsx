import { NAV_ROUTES } from '../../model/navigation.constants.js';
import { NavItem } from './NavItem';
import styles from './RegularNav.module.scss';

export const RegularNav = () => {
    return (
        <nav className={styles.nav}>
            { NAV_ROUTES.map(route => (
                <NavItem
                    key={route.id}
                    route={route}
                />
            ))}
        </nav>
    )
}