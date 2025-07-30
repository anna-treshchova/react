import { useState, useEffect, useRef, memo, useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';
import { TodoContext } from '../../../contexts/TodoContext';

import './Item.css';

export function TodoItem({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text); // Ми заводимо newText для того щоб одразу не змінювати основні дані (todo.text)
                                                       // newText — це тимчасове місце, куди потрапляє текст, який користувач вводить у <input>
                                                       // Але ми не записуємо його в глобальний стан todos, поки користувач не натисне Enter або onBlur
    const { theme } = useContext(ThemeContext);

    const {
        toggleTodo = () => {},
        deleteTodo = () => {},
        editTodo = () => {},
    } = useContext(TodoContext);

    const inputRef = useRef();

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const enterEditMode = () => setIsEditing(true)
    const handleToggle = () => toggleTodo(todo.id)
    const handleDelete = () => deleteTodo(todo.id)

    const confirmEdit = () =>  {
        newText.trim()
            ? editTodo(todo.id, newText)  // editTodo — це функція, яка оновлює todo.text в глобальному стані (todos)
            : setNewText(todo.text)
        setIsEditing(false)               // Виходимо з режиму редагування (ховаємо <input>, показуємо <span>)
    }

    const handleTextChange = (e) => setNewText(e.target.value)         // Оновлює локальний стан newText при кожному вводі в <input>
    const handleKeyEnter = (e) => e.code === 'Enter' && confirmEdit()  // Обробник події натискання клавіші 'Enter' в <input>

    return (
        <li
            className={`todo__item ${todo.completed ? 'completed' : ''}`}
            style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                backgroundColor: theme === 'light' ? '#f8f8f8' : '#2e2e2e',
            }}
            onClick={handleToggle}
        >
            {isEditing
                ? <input
                    type='text'
                    placeholder='New text for todo...'
                    value={newText}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyEnter}
                    onBlur={confirmEdit}
                    ref={inputRef}
                />
                : <>
                    <span className='todo__item-text'>{newText}</span>
                    <button className='delete-btn' onClick={handleDelete}>x</button>
                    <button onClick={enterEditMode}>Edit</button>
                </>
            }
        </li>
    )
}

export default memo(TodoItem);


/*

 Контексти в React зазвичай використовуються для глобальних, але нечасто змінюваних даних, до яких потрібно мати доступ
 з багатьох компонентів:

   1. Тема додатку (light/dark)  —>  ThemeContext

   2. Мова інтерфейсу (en/ua) —>  LanguageContext

   3. Дані поточного користувача (профіль, статус авторизації)  —>  AuthContext

   4. Глобальні сповіщення   —>  NotificationContext

   Якщо дані часто змінюються або мають більш складну логіку ВИКОРИСТОВУЮТЬ Redux
 */