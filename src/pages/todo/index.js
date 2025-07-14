import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import TodoForm from './components/Form';
import TodoList from './components/List';
import TodoHeader from './components/Header';

export default function Todo() {
    const [todos, setTodos] = useState([
        {
            id: uuidv4(),
            text: 'Cover React Class Component Lifecycle',
            completed: true
        },
        {
            id: uuidv4(),
            text: 'Complete Todo Task and push the changes to GitHub',
            completed: false
        },
        {
            id: uuidv4(),
            text: 'Complete hw25.1',
            completed: false
        }
    ])

    const toggleTodo = (id) => {
        setTodos(prevState => prevState.map(todo =>
               todo.id === id ? {...todo,  completed: !todo.completed} : todo
        ));
    }

    const deleteTodo = (id) => {
        setTodos(prevState => prevState.filter(todo => todo.id !== id))
    }

    const editTodo = (id, newText) => {
        setTodos(prevState => prevState.map(todo =>
            todo.id === id ? {...todo, text: newText} : todo
        ));
    }

    return (
        <>
            <TodoHeader/>
            <TodoForm/>
            <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
            />
        </>
    )
}

