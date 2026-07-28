import { useLayoutEffect, useRef } from 'react';
import { EMPTY_FUNCTION } from '../../constants/empty';
import styles from './AnimatedHeight.module.scss';

export const AnimatedHeight = ({
    open,
    children,
    className = '',
    onCollapsed = EMPTY_FUNCTION,
}) => {
    const elementRef = useRef(null);
    const onCollapsedRef = useRef(onCollapsed);

    onCollapsedRef.current = onCollapsed;

    useLayoutEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        if (open) {
            const height = element.scrollHeight;
            element.style.height = `${height}px`;

            const handleTransitionEnd = (e) => {
                if (e.target !== element || e.propertyName !== 'height') return;

                element.style.height = 'auto';
                element.removeEventListener('transitionend', handleTransitionEnd);
            };

            element.addEventListener('transitionend', handleTransitionEnd);

            return () => element.removeEventListener('transitionend', handleTransitionEnd);
        } else {
            if (element.style.height === 'auto') {
                element.style.height = `${element.scrollHeight}px`;
            }

            void element.offsetHeight;

            element.style.height = '0px';

            const handleTransitionEnd = (e) => {
                if (e.target !== element || e.propertyName !== 'height') return;

                if (onCollapsedRef.current) {
                    onCollapsedRef.current();
                }

                element.removeEventListener('transitionend', handleTransitionEnd);
            };

            element.addEventListener('transitionend', handleTransitionEnd);

            return () => element.removeEventListener('transitionend', handleTransitionEnd);
        }
    }, [open]);

    return (
        <div
            ref={elementRef}
            className={`${styles.animatedHeight} ${className}`}
            data-open={open}
        >
            {children}
        </div>
    );
}