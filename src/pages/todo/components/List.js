import { useContext } from 'react';

import { TodoContext } from '../../../contexts/TodoContext'

import TodoItem from './Item';

export default function TodoList() {
    const { todos = [] } = useContext(TodoContext)

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}
