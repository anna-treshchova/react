import { useDispatch } from 'react-redux';

import { updateTopicStatus, deleteTopic } from '../../../store/slices/learningSlice';

import styles from './Item.module.css';

export default function TopicItem({ topic = {} })  {
    const dispatch = useDispatch();

    const handleStatusChange = (e) => {
        dispatch(updateTopicStatus({
            id: topic.id,
            newStatus: e.target.value
        }))
    }

    const handleDelete = () => {
        dispatch(deleteTopic(topic.id))
    }

    return (
        <li className={`${styles['topics__item']} ${styles[topic.status]}`}>
            <div className={styles['topic__info']}>
                <h4>{topic.title}</h4>
                <span>{topic.description}</span>
            </div>
            <div className={styles['topic__controls']}>
                <select value={topic.status} onChange={handleStatusChange}>
                    <option value='not-started'>Not started</option>
                    <option value='in-progress'>In progress</option>
                    <option value='done'>Done</option>
                </select>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}