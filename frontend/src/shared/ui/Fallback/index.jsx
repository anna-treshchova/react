import ErrorFallbackIcon from '../../assets/icons/error-fallback.svg?react';
import EmptyFallbackIcon from '../../assets/icons/empty-fallback.svg?react';
import SoonFallbackIcon from '../../assets/icons/soon-fallback.svg?react';

import styles from './Fallback.module.scss';

const FALLBACK_ICONS = {
    error: ErrorFallbackIcon,
    empty: EmptyFallbackIcon,
    soon: SoonFallbackIcon,
}

export const Fallback = ({ variant, title, description, children }) => {
    const CurrentIcon = FALLBACK_ICONS[variant];

    return (
        <div className={`${styles.fallback} ${variant === 'error' ? styles.error : ''}`}>
            <div className={styles.details}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

            {CurrentIcon && (
                <div className={styles.iconWrapper}>
                    <CurrentIcon />
                </div>
            )}
            {children}
        </div>
    )
}