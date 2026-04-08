import styles from './Container.module.scss';

const Container = ({ children, narrow = false }) => {
    return <div className={`${styles.container} ${narrow && styles.narrow} `}>
        {children}
    </div>
}

export default Container