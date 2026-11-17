import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    size?: ButtonSize;
}

export const Button = ({
    type = 'button',
    size = 'medium',
    children,
    className,
    ...props
}: ButtonProps) => {

    const buttonClasses = [
        styles.button,
        styles[size],
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    )
}