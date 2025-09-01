import { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getPostById, getComments } from '../../store/thunks/postsThunk'

import CommentList from './components/CommentList';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './PostsDetails.module.css'


export default function PostDetails() {
    const [showComments, setShowComments] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        post,
        loadingPost,
        postError,
        comments
    } = useSelector((state) => state.posts);

    const { id } = useParams();
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        dispatch(getPostById(id));
    }, [dispatch, id]);

    const handleLoadComments = () => {
        if (!showComments && comments.length === 0) {
            dispatch(getComments(id))
        }

        setShowComments(state => !state);
    }

    if (loadingPost) {
        return (
            <h3 style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                marginTop: '30px'
            }}>
                Loading post data...
            </h3>
        )
    }

    if (postError) {
        return (
            <span className={styles.error}>Error: {postError}</span>
        )
    }

    const goToPosts = () => navigate('/posts');
    const goHome = () => navigate('/');

    return (
        <div
            className={`${styles['post-details']} ${styles[`mode-${theme}`]}`}
        >
            <h1>Post Details</h1>
            <div className={styles['post-details__content']}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <button onClick={handleLoadComments}>{showComments ? 'Hide comments' : 'Show comments'}</button>
            </div>

            { showComments && <CommentList /> }

            <div className={styles['post-details__btn-box']}>
                <button onClick={goToPosts}>See all posts</button>
                <button onClick={goHome}>Home</button>
            </div>
        </div>
    )
}
