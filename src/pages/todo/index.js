import TodoProvider from '../../contexts/TodoContext'

import TodoForm from './components/Form';
import TodoList from './components/List';
import TodoHeader from './components/Header';

export default function Todo() {
    return (
        <TodoProvider>
            <div className='todo'>
                <TodoHeader/>
                <TodoForm/>
                <TodoList/>
            </div>
        </TodoProvider>
    )
}

