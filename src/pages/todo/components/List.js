import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TodoItem from './Item';

import styles from '../Todo.module.css'


export default function TodoList() {
    const todos = useSelector(state => state.todos);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <ul className={styles['todo__list']}>
            {todos.map(todo => (<TodoItem key={todo.id} todo={todo} />))}
        </ul>
    )
}
