import PostItem from "./PostItem";

import styles from '../Posts.module.css'

export default function PostList({ posts }) {
    return (
        <ul className={styles['posts__list']}>
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                />
            ))}
        </ul>
    )
}