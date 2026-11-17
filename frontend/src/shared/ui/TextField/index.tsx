import {
    useState,
    type ComponentPropsWithoutRef,
    type ReactNode
} from 'react';

import { ExclamationCircleFilled } from '@ant-design/icons';

import { AnimatedHeight } from '../AnimatedHeight';

import styles from './TextField.module.scss';

type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
    id: string,
    label: string;
    children?: ReactNode;
    showChildren: boolean;
    error?: string;
}

export const TextField = ({
    id,
    label,
    disabled,
    children,
    showChildren,
    error,
    ...props
}: TextFieldProps) => {
    const [displayedError, setDisplayedError] = useState('');

    if (error && error !== displayedError) {
        setDisplayedError(error);
    }

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

            <AnimatedHeight
                isOpened={!!error}
                onCollapseTransitionEnd={() => setDisplayedError('')}
            >
                <div className={styles.error}>
                    <ExclamationCircleFilled />
                    <span>{displayedError}</span>
                </div>
            </AnimatedHeight>

            {hasChildren && (
                <AnimatedHeight isOpened={showChildren}>
                    {children}
                </AnimatedHeight>
            )}
        </div>
    )
}