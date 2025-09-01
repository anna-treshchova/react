import { useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';

import styles from './CommentItem.module.css';


export default function CommentItem({ comment } ) {
    const  { theme } = useContext(ThemeContext);

   return (
       <li className={`${styles['comments__item']} ${styles[`mode-${theme}`]}`}>
           <h4 className={styles['comments__name']}>{comment.name}</h4>
           <a
               href={`mailto:${comment.email}`}
               className={styles['comments__email>']}
           >
               {comment.email}
           </a>
           <span className={styles['comments__text']}>{comment.body}...</span>
       </li>
   )
}