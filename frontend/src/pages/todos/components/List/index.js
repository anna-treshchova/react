import { useSelector } from 'react-redux';

import TodoItem from '../Item';

import styles from './List.module.scss'

export default function TodoList() {
    const { todos } = useSelector(state => state.todos);

    return (
        <ul className={styles['todos__list']}>
            {todos.map(todo => (<TodoItem key={todo.id} todo={todo} />))}
        </ul>
    )
}
