import styles from './HotelCardSkeleton.module.scss';

export const HotelCardSkeleton = () => {
    return (
        <div className={styles.cardSkeleton}>
            <div className={styles.image} />
            <div className={styles.content}>
                <div className={styles.title} />
                <div className={styles.meta} />
            </div>
        </div>
    )
}