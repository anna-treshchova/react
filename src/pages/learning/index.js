import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TopicForm from './components/Form';
import TopicList from './components/List';
import TopicFilter from './components/Filter';

import styles from './LearningTracker.module.css';

export default function LearningTracker() {

    const {topics, filter } = useSelector(state => state.learning);

    const filteredTopics = topics.filter(topic => filter === 'all' ? topic : topic.status === filter);

    useEffect(() => {
        localStorage.setItem('topics', JSON.stringify(topics));
    }, [topics]);

    return (
        <div className={styles.topics}>
            <h1>Learning Tracker</h1>
            <TopicForm/>
            <TopicFilter/>
            <h2>My Topics:</h2>
            {
                filteredTopics.length === 0
                    ? <div>You don't have any topics here</div>
                    : <TopicList topics={filteredTopics}/>
            }
        </div>
    )
}
