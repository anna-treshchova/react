import Checkbox from './Checkbox';
import DeleteBtn from '../Buttons/DeleteBtn';
import UpdateBtn from '../Buttons/UpdateBtn';

import styles from './Item.module.scss';

export default function ItemView({ todo = {}, setIsUpdating }) {
    return (
        <>
            <label>
               <Checkbox todo={todo} />
                <div className={styles['todos__content']}>
                    <span className={styles['todos__title']}>{todo.title}</span>
                    <span className={styles['todos__description']}>{todo.description}</span>
                </div>
            </label>
            <div className={styles['btn-box']}>
                <DeleteBtn todo={todo}/>
                <UpdateBtn setIsUpdating={setIsUpdating}/>
            </div>
        </>
    )
}
