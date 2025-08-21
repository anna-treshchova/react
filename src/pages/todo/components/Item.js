import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './Item.module.css';

export function TodoItem({ todo = {} }) {
    const { theme } = useContext(ThemeContext);

    return (
        <li className={`${styles[`todo__item`]} ${styles[`mode-${theme}`]}`}>
            {todo.text}
        </li>
    )
}

export default TodoItem;
