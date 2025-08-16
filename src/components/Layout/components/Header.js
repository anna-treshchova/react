import { useContext } from 'react';
import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'

import { ThemeContext } from '../../../contexts/ThemeContext';

import styles from './Header.module.css';

export default function Header() {
    const { theme } = useContext(ThemeContext);

    const counter  = useSelector( state => state.counter)

    const getLinkClass = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <div className={`${styles.header} ${styles[`mode-${theme}`]}`}>
            <NavLink to='/' className={getLinkClass}>Home</NavLink>
            <NavLink to='/about' className={getLinkClass}>About</NavLink>
            <NavLink to='/contacts' className={getLinkClass}>Contacts</NavLink>
            <NavLink to='/posts' className={getLinkClass}>Posts</NavLink>
            <NavLink to='/counter-redux' className={getLinkClass}>Counter: {counter}</NavLink>
        </div>
    )
}


/*—————————————————

 <Link> — базовий компонент для навігації     —>  застарілий для навігації між сторінками

     ДЛЯ ЧОГО: Щоб змінити маршрут (route) в React-додатку без перезавантаження сторінки (на відміну від звичайного <a>)

     СИНТАКСИС:
                 import { Link } from 'react-router-dom';

                 <Link to="/about">About</Link>

     ПІД КАПОТОМ:
            ◦ <Link> рендериться у тег <a>

            ◦ АЛЕ зі скасованою стандартною поведінкою браузера, яка викликає GET-запит і перезавантажує сторінку

              НАТОМІСТЬ:
                         —>  Використовує history.pushState() для оновлення URL без перезавантаження

                         —>  React Router реагує на зміну ULR і підставляє відпоідний компонент на сторінку


 ❗ Використовується там, де не потрібно визначати активне посилання


———————————————————

 <NavLink> — розширена версія Link       —>  актуальний для навігації між сторінками

     ДЛЯ ЧОГО: Для створення навігаційного меню, де потрібно автоматично підсвічувати активне посилання

     ГОЛОВНА ПЕРЕВАГА:  Коли URL відповідає to, компонент <NavLink> автоматично отримує клас active


     СИНТАКСИС:
                 import { NavLink } from 'react-router-dom';

                 <NavLink to="/about">About</NavLink>


     МОЖНА СТИЛІЗУВАТИ <NavLink> ОДНИМ ІЗ ДВОХ СПОСОБІВ:

        1. ЧЕРЕЗ CSS: Коли посилання активне (URL збігається з to), React Router автоматично додає клас active, який
                      можна стилізувати у CSS:

                .active {
                  font-weight: bold;
                  color: red;
                }

                ПІДХОДИТЬ, якщо нам достатньо лише класу active
                НЕ МОЖНА додавати додаткові класи чи логіку


        2. ЧЕРЕЗ ФУНКЦІЮ в className:

             ПОТРІБНО ВИКОРИСТОВУВАТИ:

                 1. ❗КОЛИ МИ ВИКОРИСТОВУЄМО CSS Modules

                 2. Коли логіка додавання класів залежить не лише від isActive

                      НАПРИКЛАД:
                                  <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                      isActive
                                        ? user.isAdmin
                                          ? 'admin-active'
                                          : 'user-active'
                                        : ''
                                    }
                                  />

                 3. Коли не вистачає стандартного класу .active

                      React Router додає тільки один клас .active й якщо нам треба більше кастомних класів які залежать
                      від активності посилання — потрібна функція

                      НАПРИКЛАД: Якщо в нас є клас, який має додаватися лише до одного конкретного активного посилання



             НЕ ПОТРІБНО ВИКОРИСТОВУВАТИ функцію в className:

                 1. КОЛИ МИ НЕ ВИКОРИСТОВУЄМО CSS Modules

                 2. Коли достатньо стилізувати активне посилання через .active

                 3. Коли всі твої стилі загальні (однакові для всіх посилань)


                 <NavLink
                   to="/about"
                   className={({ isActive }) => isActive ? 'link active' : 'link'}
                 >
                   About
                 </NavLink>


                 ЩО ВІДБУВАЄТЬСЯ: Компонент <NavLink> приймає проп className, який може бути:

                     1. Рядком  —>  className="link"

                     2. Або функцією, яка отримує об'єкт з інформацією про стан посилання й повертає рядок класу

                               {
                                 isActive: true,       —>  чи активне посилання (URL збігається з to)
                                 isPending: false,     —>  чи зараз триває перехід
                                 isTransitioning: false
                               }

                           Нас цікавить ГОЛОВНЕ ПОЛЕ: isActive — булеве значення, що показує, чи активне це посилання
                           (чи збігається URL з to)


                         2.1  ({ isActive }) — деструктуризація аргументу (об'єкта, який передає React Router у функцію)

                         2.2  isActive ? 'link active' : 'link'   —>  Умовне додавання класів


—————— ↓ ↓ ↓ ———————

 ❗Якщо ми використовуємо CSS Modules й хочемо працювати з класом .active у <NavLink> — єдиний стабільний варіант:

        1.  Не використовувати глобальні стилі типу .header a, а створити окремі класи в модулі

                .link {
                  color: #000000;
                  text-decoration: none;
                }

                .active {
                  color: #ffffff;
                }

        2. Передавати className у NavLink як функцію, яка:

              ◦ завжди додає базовий клас link

              ◦ додає клас active, якщо посилання активне


               <NavLink
                 to='/'
                 className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link }
               >
                 Home
               </NavLink>       —>     ЦЕЙ ВАРІАНТ ГАРАНТОВАНО УНИКАЄ КОНФЛІКТІВ СПЕЦИФІЧНОСТІ


—————— ↓ ↓ ↓ ———————

        🚫 Чому не можна спиратися на глобальний селектор .header a у CSS Modules:

              ◦ Бо це глобальний клас, який має вищу специфічність ніж окремий клас .active

                                        (11)  >  (10)
                     .Header_header__HXQOm a  >  Header_link__xIhZh

              ◦ Через це стилі, задані в .header a, перебивають стилі з .active — навіть якщо .active застосовується
                безпосередньо до посилання

                                                                              ——————————————————————————————————————————

                                                                                   СПЕЦИФІЧНІСТЬ CSS-СЕЛЕКТОРІВ

                                                                                       #id = 100 балів

                                                                                       .class = 10 балів

                                                                                       element (тег) = 1 бал

                                                                              ————————————————————————————————————————*/

