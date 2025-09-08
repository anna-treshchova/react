import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addTodo } from '../../../../store/thunks/todoThunk';

import AddIcon from '../Icons/AddIcon'

import { ThemeContext } from '../../../../contexts/ThemeContext';

import styles from './AddForm.module.scss'

export default function AddForm(){
    const dispatch = useDispatch();

    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');

   const addStatus = useSelector(state => state.todos.status.add);

   const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (addStatus === 'succeeded') {
            setTodoTitle('');
            setTodoDescription('');
        }
    }, [addStatus]);

    const handleAddTodo = (e) => {
        e.preventDefault()

       if (todoTitle.trim()) {
           dispatch(addTodo({
               title: todoTitle.trim(),
               description: todoDescription.trim(),
           }))
       }
    }

    return (
        <form
            className={`${styles['add-form']} ${styles[`mode-${theme}`]}`}
            onSubmit={handleAddTodo}
        >
            <input
                type='text'
                value={todoTitle}
                placeholder='Title'
                aria-label='Todo title'
                onChange={e => setTodoTitle(e.target.value)}
                disabled={addStatus==='loading'}
                autoFocus
            />
            <input
                type='text'
                value={todoDescription}
                placeholder='Enter task details (optional)'
                aria-label='Todo description'
                onChange={e => setTodoDescription(e.target.value)}
                disabled={addStatus==='loading'}
            />
            <button type='submit' disabled={addStatus === 'loading'}>
                {addStatus === 'loading' ? 'Adding...' : <AddIcon />}
            </button>
        </form>
    )
}


/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


 Будь-яка зміна в Redux state, яку компонент читає через useSelector, провокує ререндер цього компонента

 1. У React функціональний компонент — це просто функція. При кожному ререндері функція викликається заново:

     1.1  Компонент-функція виконується повністю знову
          (Усі виклики useState, useSelector, useEffect, JSX повертається наново)

     1.2  Але React зберігає між викликами:

           ◦ значення useState

           ◦ useEffect / useMemo / useCallback  —> останні депенденсі (deps) для порівняння при наступному рендері

           ◦ useRef — посилання на об’єкт із .current

     1.3  Це дає ілюзію, що функція живе постійно, хоча насправді вона виконується щоразу заново


 2. useEffect не виконується при кожному виклику функції, а тільки коли:

     2.1  Компонент вперше вмонтувався —> useEffect завжди виконується

     2.2  Змінилася одна з залежностей у масиві deps —> тоді:

           ◦ Спочатку викликається cleanup ефекту

           ◦ Потім виконується новий ефект

     2.3  Компонент розмонтується —> викликається cleanup останнього ефекту



                          Алгоритм роботи useEffect із залежністю [addError]
                         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 1. Монтування компонента

     1.1  Викликається функція компонента (render)

     1.2  addError = null

     1.3  Після рендера React виконує useEffect, бо useEffect завжди виконується при першому монтуванні, навіть якщо
          залежність null

     1.4  Якщо useEffect повертає функцію (cleanup) — React запам’ятовує її, але не викликає одразу

     —>   useEffect виконується


 2. Ререндер без зміни addError (наприклад, змінився інший state)

     2.1  Компонент знову виконується

     2.2  Але addError не змінився — залишився null

     2.3  useEffect не викликається повторно

     —>   Ні useEffect ні cleanup не викликаються


 3. Ререндер зі зміною addError

     3.1  addError змінюється на 'Failed to add todo'

     3.2  Компонент виконується повторно (render)

     3.3  React бачить що залежність змінилася (null —> 'Failed to fetch todos')

     3.4  Перед повторним викликом useEffect, виконується збережений cleanup

     3.5  Потім запускається новий useEffect (створюється новий таймер)

     —>   Виконується cleanup, а потім новий useEffect


 4. Компонент розмонтовується

     4.1  Викликається останній збережений cleanup


*/