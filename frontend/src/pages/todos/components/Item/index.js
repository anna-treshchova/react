import { useContext, useState, useEffect } from 'react';
import { useSelector} from 'react-redux';

import ItemView from './ItemView';
import UpdateForm from '../UpdateForm';
import Spinner from '../Icons/Spinner'

import { ThemeContext } from '../../../../contexts/ThemeContext';

import styles from './Item.module.scss';

export default function TodoItem({ todo = {} }) {
    const [isUpdating,  setIsUpdating] = useState(false);

    const updateStatus = useSelector(state => state.todos.status.update);
    const updatingId = useSelector(state => state.todos.updatingId);

    const deleteStatus = useSelector(state => state.todos.status.delete);
    const deletingId = useSelector(state => state.todos.deletingId);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (updateStatus === 'succeeded' && updatingId === todo.id) {
           setIsUpdating(false);
        }
    }, [updateStatus]);


    return (
        <li className={`
            ${styles[`todos__item`]} 
            ${styles[`mode-${theme}`]} 
            ${todo.completed ? styles.checked : ''}
         `}
        >
            {updateStatus === 'loading' && updatingId === todo.id && <Spinner/>}
            {deleteStatus === 'loading' && deletingId === todo.id && <Spinner/>}

            {isUpdating
                ? <UpdateForm todo={todo} setIsUpdating={setIsUpdating}/>
                : <ItemView todo={todo} setIsUpdating={setIsUpdating} />}
        </li>
    )
}
