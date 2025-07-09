import React from 'react';

import './Item.css';

class TodoItem extends React.Component {

    handleToggle = () => {
        this.props.toggleTodo(this.props.todo.id)
    }
    // Викликаємо функцію toggleTodo, передану як prop, і передаємо в неї id — todo.id, яке також було передано через props

    handleDelete = () => {
        this.props.deleteTodo(this.props.todo.id)
    }

    render() {

        return (
            <li className={`todo__item ${this.props.todo.completed ? 'completed' : ''}`}
                onClick={this.handleToggle}
                onDoubleClick={this.handleDelete}
            >
                <span className='todo__item-description'>{this.props.todo.description}</span>
            </li>
        )
    }
}

export default TodoItem;