import { createContext, useState, useCallback, useMemo } from 'react';

import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext(null);

export default function TodoProvider({children}) {
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

    const toggleTodo = useCallback(id => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? {...todo,  completed: !todo.completed} : todo
        ));
    }, [])

    const deleteTodo = useCallback(id => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, [])

    const editTodo = useCallback((id, newText) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? {...todo, text: newText} : todo
        ));
    }, [])

    const contextValue = useMemo( () => ({
        todos,
        toggleTodo,
        deleteTodo,
        editTodo,
    }), [todos, toggleTodo, deleteTodo, editTodo]);

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    )
}