import { useState, useEffect, useRef } from 'react';

import './Item.css';

export default function TodoItem({
    todo,
    toggleTodo = () => {},
    deleteTodo = () => {},
    editTodo = () => {},
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text); // Ми заводимо newText для того щоб одразу не змінювати основні дані (todo.text)
                                                       // newText — це тимчасове місце, куди потрапляє текст, який користувач вводить у <input>
                                                       // Але ми не записуємо його в глобальний стан todos, поки користувач не натисне Enter або onBlur
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
