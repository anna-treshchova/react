import { useRef } from 'react';
import { DotLoader } from '../DotLoader';
import styles from './GradientButton.module.scss';

export const GradientButton = ({
    children,
    type = 'button',
    isLoading = false,
    onClick = () => {},
    ...rest
}) => {
    const rectRef = useRef(null);

    const handleMouseEnter = (e) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const handleMouseMove = (e) => {
        if (!rectRef.current) return;

        const rect = rectRef.current;

        const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2);
        const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2);

        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
    };

    return (
        <button
            type={type}
            className={styles.button}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            disabled={isLoading}
            onClick={onClick}
            {...rest}
        >
            {isLoading ? <DotLoader /> : <span>{children}</span>}
        </button>
    )
}
