import styles from './DotLoader.module.scss'

type DotLoaderProps = {
    color?: 'gray' | 'white';
}

export const DotLoader = ({ color = 'gray' }: DotLoaderProps) => {
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