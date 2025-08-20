import { useSelector } from 'react-redux';

import TopicForm from './components/Form';
import TopicList from './components/List';

import styles from './LearningTracker.module.css';


export default function LearningTracker() {
    const {topics, filter } = useSelector(state => state.learning);
    const filteredTopics = topics.filter(topic => filter === 'all' ? topic : topic.status === filter);

    return (
        <div className={styles.topics}>
            <h1>Learning Tracker</h1>
            <TopicForm/>
            <h2 style={{ marginTop: '70px'}}>My Topics:</h2>
            {
                filteredTopics.length === 0
                    ? <div>You don't have any topics</div>
                    : <TopicList topics={filteredTopics}/>
            }
        </div>
    )
}
