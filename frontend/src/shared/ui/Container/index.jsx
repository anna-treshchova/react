import styles from './Container.module.scss';

export const Container = ({ children, narrow = false }) => {
    return <div className={`${styles.container} ${narrow && styles.narrow}`}>
        {children}
    </div>
}