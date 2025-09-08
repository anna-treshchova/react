import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllTodos } from '../../store/thunks/todoThunk';
import useErrorToast from '../../hooks/useErrorToast';

import AddForm from './components/AddForm';
import TodoList from './components/List';

import styles from './Todos.module.scss';


export default function Todos() {
    const dispatch = useDispatch();

    const { status, error } = useSelector(state => state.todos);

    const getStatus = status.get;
    const getError = error.get;

    const addStatus = status.add;
    const addError = error.add;

    const toggleStatus = status.toggle;
    const toggleError = error.toggle;

    const deleteStatus = status.delete;
    const deleteError = error.delete;

    const updateStatus = status.update;
    const updateError = error.update;


    useEffect(() => {
        dispatch(getAllTodos());
    }, [dispatch]);

    useErrorToast(getStatus, getError);
    useErrorToast(addStatus, addError);
    useErrorToast(toggleStatus, toggleError);
    useErrorToast(deleteStatus, deleteError);
    useErrorToast(updateStatus, updateError);

    return (
        <div className={`${styles.todos}`}>
            <h1>Todo Page</h1>
            <AddForm/>
            <TodoList/>
        </div>
    )
}

