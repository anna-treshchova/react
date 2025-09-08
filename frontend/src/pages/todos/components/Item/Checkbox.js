import { useSelector, useDispatch } from 'react-redux';


import { toggleTodo } from '../../../../store/thunks/todoThunk';

import styles from '../UpdateForm/UpdateForm.module.scss'

export default function Checkbox({ todo = {} }){
    const dispatch = useDispatch();

    const toggleStatus = useSelector(state => state.todos.status.toggle);
    const togglingId = useSelector(state => state.todos.togglingId);

    const handleToggleTodo = (id, checked) => {
        dispatch(toggleTodo({id, checked}));
    }

    return (
        <input
            type='checkbox'
            className={styles['toggle-checkbox']}
            checked={todo.completed}
            onChange={e => handleToggleTodo(todo.id, e.target.checked)}
            disabled={toggleStatus === 'loading' && togglingId === todo.id}
        />
    )
}