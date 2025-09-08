import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateTodo } from '../../../../store/thunks/todoThunk';

import Checkbox from '../Item/Checkbox';
import CloseIcon from '../Icons/CloseIcon';
import SaveIcon from '../Icons/SaveIcon';

import styles from './UpdateForm.module.scss'


export default function UpdateForm( { todo = {}, setIsUpdating } ) {
    const dispatch = useDispatch();

    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const [updatedDescription, setUpdatedDescription] = useState(todo.description);

    const updateStatus = useSelector(state => state.todos.status.update);
    const updatingId = useSelector(state => state.todos.updatingId);

    const handleUpdateTodo = (e) => {
        e.preventDefault()

       if (updatedTitle.trim()) {
           dispatch(updateTodo({
               id: todo.id,
               title: updatedTitle.trim(),
               description: updatedDescription.trim(),
               completed: todo.completed
           }))
       }
    }

    return (
        <form className={styles['update-form']} onSubmit={handleUpdateTodo}>
            <Checkbox todo={todo}/>
            <div className={styles['input-box']}>
                <input
                    type='text'
                    value={updatedTitle}
                    aria-label='Todo title'
                    onChange={e => setUpdatedTitle(e.target.value)}
                    disabled={updateStatus==='loading'}
                    autoFocus
                />
                <input
                    type='text'
                    value={updatedDescription}
                    aria-label='Todo description'
                    onChange={e => setUpdatedDescription(e.target.value)}
                    disabled={updateStatus==='loading'}
                />
            </div>
            <div className={styles['btn-box']}>
                <button
                    type='button'
                    onClick={() => setIsUpdating(false)}
                    aria-label='Cancel editing'
                >
                    <CloseIcon/>
                </button>
                <button
                    type='submit'
                    disabled={updateStatus==='loading' && updatingId === todo.id}
                    aria-label='Save changes'
                >
                  <SaveIcon/>
                </button>
            </div>
        </form>
    )
}