import { useRef, type MouseEvent, type ComponentPropsWithoutRef } from 'react';
import { DotLoader } from '../DotLoader';
import styles from './GradientButton.module.scss';

type GradientButtonProps = ComponentPropsWithoutRef<'button'> & {
    isLoading?: boolean;
}

export const GradientButton = ({
    children,
    type = 'button',
    isLoading = false,
    disabled,
    className,
    onMouseEnter,
    onMouseMove,
    ...props
}: GradientButtonProps) => {
    const rectRef = useRef<DOMRect | null>(null);

    const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
        onMouseEnter?.(e);
    }

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (rectRef.current) {
            const rect = rectRef.current;

            const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2);
            const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2);

            e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
        }

        onMouseMove?.(e);
    };

    return (
        <button
            type={type}
            className={`${styles.button} ${className ?? ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <DotLoader /> : <span>{children}</span>}
        </button>
    )
}
