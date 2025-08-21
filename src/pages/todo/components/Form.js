import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from '../../../store/actions/todoActions';

import { ThemeContext } from '../../../contexts/ThemeContext';

import styles from './Form.module.css'

export default function TodoForm(){
    const [todoText, setTodoText] = useState('');

    const { theme } = useContext(ThemeContext);

    const dispatch = useDispatch();

    const handleAddTodo = (e) => {
        e.preventDefault()

       if (todoText.trim()) {
           dispatch(addTodo(todoText.trim()));
       }

       setTodoText('');
    }

    return (
        <>
            <form
                className={`${styles['todo__form']} ${styles[`mode-${theme}`]}`}
                onSubmit={handleAddTodo}
            >
                <input
                    type='text'
                    placeholder='Add New Todo'
                    value={todoText}
                    onChange={e => setTodoText(e.target.value)}
                />
                <button type='submit'>Add</button>
            </form>
        </>
    )
}

