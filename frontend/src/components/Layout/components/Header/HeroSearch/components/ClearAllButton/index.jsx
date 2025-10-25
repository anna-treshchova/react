import styles from './ClearAllButton.module.scss';


const ClearAllButton = ({ onClick }) => {
    return (
        <button
            type='text'
            className={styles.clearAllBtn}
            onClick={onClick}
        >
            Clear all
        </button>
    )
}
export default ClearAllButton;