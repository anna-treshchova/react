import PropTypes from 'prop-types';
import styles from './ClearButton.module.scss';

const ClearButton = ({ onClick }) => {
    return (
        <button
            type='button'
            className={styles.button}
            onClick={onClick}
        >
            Clear all
        </button>
    )
}

ClearButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ClearButton;