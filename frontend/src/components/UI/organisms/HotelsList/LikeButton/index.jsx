import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { toggleFavorite } from '@/store/thunks/hotelsThunk.js';

import LikeIcon from './LikeIcon.jsx';

import styles from './LikeButton.module.scss';

const LikeButton = ({ id, favorite }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.stopPropagation();
        dispatch(toggleFavorite({
            id: id,
            favorite: !favorite
        }));
    }

    return (
        <button
            className={styles.likeBtn}
            onClick={handleClick}
        >
            <LikeIcon favorite={favorite} />
        </button>
    )
}

LikeButton.propTypes = {
    id: PropTypes.number.isRequired,
    favorite: PropTypes.bool.isRequired,
}

export default LikeButton;