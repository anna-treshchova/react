import styles from './Item.module.css';

export default function TopicItem({ topic = {} })  {
    return (
        <li className={styles['topics__item']}>
            <h4>{topic.title}</h4>
            <p>{topic.description}</p>
            <span>{topic.status}</span>
        </li>
    )
}