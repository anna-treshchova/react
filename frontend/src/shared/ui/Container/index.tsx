import type { ReactNode } from 'react';
import styles from './Container.module.scss';

type ContainerProps = {
    narrow?: boolean;
    children: ReactNode;
}

export const Container = ({ narrow = false, children }: ContainerProps) => {
    const containerClasses = [
        styles.container,
        narrow && styles.narrow
    ].filter(Boolean).join(' ');

    return <div className={containerClasses}>{children}</div>
}