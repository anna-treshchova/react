import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTopic } from '../../../store/actions/learningActions';

import styles from './Form.module.css';

export default function TopicForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim()){
            dispatch(addTopic(title.trim(), description.trim()));
        }

        setTitle('');
        setDescription('');
    }

    return (
        <form
            className={styles['topics__form']}
            onSubmit={handleSubmit}
        >
            <h3>Add New Topic</h3>
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type='text'
                placeholder='Descriptopn'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type='submit'>Add</button>
        </form>
    )
}