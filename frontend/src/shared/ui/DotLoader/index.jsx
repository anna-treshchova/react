import styles from './DotLoader.module.scss'

export const DotLoader = ({ color = 'gray' }) => {
    return (
        <div
            className={`${styles.loader} ${styles[color]}`}
            role='status'
            aria-label='Loading'
        >
            <span />
            <span />
            <span />
        </div>
    )
}