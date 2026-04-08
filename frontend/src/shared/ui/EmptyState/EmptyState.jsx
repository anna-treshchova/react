import styles from './EmptyState.module.scss'

const EmptyState = ({
    image,
    imageWidth = 300,
    title,
    description,
    children
}) => {
    return (
        <div className={styles.emptyState}>
            <img
                src={image}
                alt={title}
                style={{width: imageWidth}}
            />
            <h1>{title}</h1>
            <p>{description}</p>
            {children}
        </div>
    )
}
export default EmptyState;