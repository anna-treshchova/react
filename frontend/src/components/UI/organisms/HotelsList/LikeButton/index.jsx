import { useDispatch } from 'react-redux';
import { toggleFavorite } from '@/store/thunks/hotelsThunk.js';
import LikeIcon from './LikeIcon.jsx';
import styles from './LikeButton.module.scss';

const LikeButton = ({ hotel }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.stopPropagation();
        dispatch(toggleFavorite({
            id: hotel.id,
            favorite: !hotel.favorite
        }));
    }

    return (
        <button
            className={styles.likeBtn}
            onClick={handleClick}
        >
            <LikeIcon favorite={hotel.favorite} />
        </button>
    )
}

export default LikeButton;