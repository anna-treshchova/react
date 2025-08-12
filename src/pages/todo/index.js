import {useContext} from 'react';

import TodoProvider from '../../contexts/TodoContext'

import TodoForm from './components/Form';
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
                <TodoForm/>
                <TodoList/>
            </div>
        </TodoProvider>
    )
}

