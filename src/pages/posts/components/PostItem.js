import { useContext } from 'react';
import { NavLink } from 'react-router';

import { ThemeContext } from '../../../contexts/ThemeContext';

import styles from '../Posts.module.css'


export default function PostItem( { post } ) {
    const  { theme } = useContext(ThemeContext);

   return (
       <li className={`${styles['posts__item']} ${styles[`mode-${theme}`]}`}>
           <h4>{post.title}</h4>
           <div>
               <span>{post.body.slice(0, 70)}...</span>
               <NavLink to={`/posts/${post.id}`}>
                   <button>Details</button>
               </NavLink>
           </div>
       </li>
   )
}