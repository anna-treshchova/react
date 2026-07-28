import { useCallback, useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import styles from './TextField.module.scss';
import { AnimatedHeight } from '../AnimatedHeight';

export const TextField = ({
    id,
    label,
    error,
    children,
    showChildren,
    disabled,
    ...props
}) => {
    const [displayedError, setDisplayedError] = useState(false);

    if (error && error !== displayedError) {
        setDisplayedError(error);
    }

    const handleErrorClose = useCallback(() => {
        setDisplayedError('');
    }, [])

    const hasChildren = !!children;

    return (
        <div
            className={styles.field}
            data-error={!!error}
            data-disabled={disabled}
            data-has-children={hasChildren}
            data-show-children={hasChildren && showChildren}
        >
            <div className={styles.inputWrapper}>
                <input
                    id={id}
                    type='text'
                    placeholder=' '
                    {...props}
                    disabled={disabled}
                />
                <label htmlFor={id}>{label}</label>
            </div>

            <AnimatedHeight open={!!error} onCloseTransition={handleErrorClose}>
                <div className={styles.error}>
                    <ExclamationCircleFilled />
                    <span>{displayedError}</span>
                </div>
            </AnimatedHeight>

            {hasChildren && (
                <AnimatedHeight open={showChildren}>
                    {children}
                </AnimatedHeight>
            )}
        </div>
    )
}