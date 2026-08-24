import { navConfig } from '../../model/nav.config.js';
import { NavItem } from './NavItem/index.jsx';
import styles from './RegularNav.module.scss';

export const RegularNav = () => {
    return (
        <nav className={styles.nav}>
            { navConfig.map((route, index) => (
                <NavItem
                    key={route.id}
                    route={route}
                    index={index}
                />
            ))}
        </nav>
    )
}