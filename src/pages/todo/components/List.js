import React from 'react';

import TodoItem from './Item';

class TodoList extends React.Component {

    render() {
        const { todos, toggleTodo, deleteTodo } = this.props;  // деструктуризуємо об'єкт this.props, щоб отримати
                                                               // окремі змінні й замість this.props.todos писати todos
        return (
            <div>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </div>
        )
    }
}

export default TodoList;