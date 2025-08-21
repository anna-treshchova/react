import { useContext } from 'react';
import { useSelector } from 'react-redux';

import TodoForm from './components/Form';
import TodoList from './components/List';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './Todo.module.css';

export default function Todo() {
    const { theme } = useContext(ThemeContext);

    const todos = useSelector((state) => state.todos);

    return (
        <div className={`${styles.todo} ${styles[`mode-${theme}`]}`}>
            <h1>Todo Page</h1>
            <TodoForm/>
            <TodoList/>
            <span className={styles['todo__total']}>Total tasks: {todos.length}</span>
        </div>
    )
}

