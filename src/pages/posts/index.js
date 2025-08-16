import { useState, useEffect, useContext } from 'react';

import { getAllPosts } from '../../api/posts';

import { ThemeContext } from '../../contexts/ThemeContext';

import PostList from './components/PostList';

import styles from './Posts.module.css';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {

        async function fetchPosts()  {
            try {
                const data = await getAllPosts();
                setPosts(data);
            } catch (err) {
                console.error(`Error: ${err.message}`);
            } finally {
                setLoading(false);
            }

        }

        fetchPosts();
    }, [])

    if (loading) {
        return (
            <h3 style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                Loading...
            </h3>
        )
    }

    return (
        <div className={`${styles.posts} ${styles[`mode-${theme}`]}`}>
            <h1>Posts</h1>
            <PostList posts={posts} />
        </div>
    )
}
