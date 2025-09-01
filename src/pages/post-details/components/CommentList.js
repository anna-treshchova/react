import { useSelector } from 'react-redux';

import CommentItem from './CommentItem'

import styles from '../PostsDetails.module.css';


export default function CommentList() {
    const { comments, loadingComments, commentsError } = useSelector(state => state.posts)

    if (loadingComments) {
        return (
            <h3 className={styles['comments__loader']}>
                Loading Comments...
            </h3>
        )
    }

    if (!loadingComments && comments.length === 0) {
        return <span className={styles['comments__empty']}>No comments yet</span>;
    }

    if (commentsError) {
        return (
            <span className={styles['comments__error']}>Error: {commentsError}</span>
        )
    }

    return(
        <ul className={styles['comments__list']}>
            { comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))
            }
        </ul>
    )
}