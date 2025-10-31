import PropTypes from 'prop-types';

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

ClearAllButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ClearAllButton;