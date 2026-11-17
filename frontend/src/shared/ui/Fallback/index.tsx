import type { FC, SVGProps, ReactNode,  } from 'react';
import ErrorFallbackIcon from '../../assets/icons/error-fallback.svg?react';
import EmptyFallbackIcon from '../../assets/icons/empty-fallback.svg?react';
import SoonFallbackIcon from '../../assets/icons/soon-fallback.svg?react';
import styles from './Fallback.module.scss';

type FallbackVariant = 'empty' | 'error'| 'soon';

type FallbackText = {
    title: string;
    description: string;
}

const FALLBACK_ICONS = {
    error: ErrorFallbackIcon,
    empty: EmptyFallbackIcon,
    soon: SoonFallbackIcon,
} as const satisfies Record<FallbackVariant, FC<SVGProps<SVGSVGElement>>>;

const FALLBACK_DEFAULTS = {
    empty: {
        title: "No results found",
        description: "Try adjusting your search or clearing the filters.",
    },
    error: {
        title: "Something went wrong",
        description: "We encountered an error while loading the data. Please try again.",
    },
    soon: {
        title: "Coming soon",
        description: "We're working on bringing this feature to you. Check back soon.",
    }
} as const satisfies Record<FallbackVariant, FallbackText>

type FallbackProps = {
    variant: FallbackVariant;
    title?: string;
    description?: string;
    children?: ReactNode;
}

export const Fallback = ({ variant, title, description, children } : FallbackProps) => {
    const CurrentIcon = FALLBACK_ICONS[variant];
    const defaults = FALLBACK_DEFAULTS[variant];

    const finalTitle = title ?? defaults.title;
    const finalDescription = description ?? defaults.description;

    return (
        <div className={`${styles.fallback} ${variant === 'error' ? styles.error : ''}`}>
            <div className={styles.details}>
                <h1>{finalTitle}</h1>
                <p>{finalDescription}</p>
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