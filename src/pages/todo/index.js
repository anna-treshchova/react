import {useContext} from 'react';

import TodoProvider from '../../contexts/TodoContext'

import TodoList from './components/List';
import TodoHeader from './components/Header';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './Todo.module.css';

export default function Todo() {
    const { theme } = useContext(ThemeContext);

    return (
        <TodoProvider>
            <div
                className={`${styles.todo} ${styles[`mode-${theme}`]}`}
            >
                <TodoHeader/>
                <TodoList/>
            </div>
        </TodoProvider>
    )
}

