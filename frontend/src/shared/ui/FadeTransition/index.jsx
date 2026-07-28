import styles from './FadeTransition.module.scss';

export const FadeTransition = ({ isLoading, skeleton, children }) => {
    return (
        <div className={styles.transitionWrapper}>
            <div className={`${styles.layer} ${isLoading ? styles.visible : styles.hidden}`}>
                {skeleton}
            </div>

            <div className={`${styles.layer} ${isLoading ? styles.hidden : styles.visible}`}>
                {children}
            </div>
        </div>
    )
}
