import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllPosts } from '../../store/thunks/postsThunk';

import PostItem from './components/PostItem';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './Posts.module.css';

export default function Posts() {
    const dispatch = useDispatch();

    const { posts, loadingPosts, postsError } = useSelector(state => state.posts);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch])

    if (loadingPosts) {
        return (
            <h3 style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                marginTop: '30px'
            }}>
                Loading Posts...
            </h3>
        )
    }

    if (postsError) {
        return (
            <span className={styles.error}>Error: {postsError}</span>
        )
    }

    return (
        <div className={`${styles.posts} ${styles[`mode-${theme}`]}`}>
            <h1>Posts</h1>
            <ul className={styles['posts__list']}>
                {posts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))}
            </ul>
        </div>
    )
}
