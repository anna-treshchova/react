import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getPostById } from '../../api/posts';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './PostsDetails.module.css'

export default function PostDetails() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    const { theme } = useContext(ThemeContext);

    useEffect(() => {

        async function fetchPost()  {
            try {
                const data = await getPostById(id);
                setPost(data);
            } catch (err) {
                console.error(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [])

    if (loading) {
        return (
            <h3 style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                Loading...
            </h3>
        )
    }

    if (!post) {
        return (
            <h3 style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                No post data found for post ID: {id}
            </h3>
        )
    }

    const goToPosts = () => navigate('/posts');
    const goHome = () => navigate('/');

    return (
        <div
            className={`${styles['post-details']} ${styles[`mode-${theme}`]}`}
        >
            <h1>Post Details</h1>
            <div className={styles['post-details__container']}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            <div>
                <button onClick={goToPosts}>See all posts</button>
                <button onClick={goHome}>Home</button>
            </div>

        </div>
    )
}
