import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleWishlist } from '@/features/hotels/model/hotelsThunk.js';

import LikeIcon from './LikeIcon.jsx';
import styles from './LikeButton.module.scss';

const LikeButton = ({ id, favorite }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.stopPropagation();

        dispatch(toggleWishlist({
            id,
            favorite: !favorite
        }));
    }

    return (
        <button
            className={styles.likeBtn}
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