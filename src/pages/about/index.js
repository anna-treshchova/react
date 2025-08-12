import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { ThemeContext } from '../../contexts/ThemeContext';

export default function About() {
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const goToContacts = () => {
        navigate('/contacts')
    }

    return (
        <div
            className='about'
            style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                backgroundColor: theme === 'light' ? '#ffffff' : '#1e1f22',
            }}
        >
            <h1>About</h1>
            <div>This page was created to test routs</div>

            <button
                onClick={goToContacts}
                style={{marginTop: '20px'}}
            >Contact us</button>
        </div>
    )
}


/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                                             navigate() з useNavigate()
                                            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                                    функція з React Router для програмної навігації


 useNavigate() — хук із React Router, який повертає функцію navigate(), за допомогою якої можна програмно перейти на
 іншу сторінку

 Використовується тоді, коли потрібно запустити навігацію з коду — тобто не через JSX-компонент <Navigate /> і не через
 клік по <Link>


 ДЕ ВИКОРИСТОВУЮТЬ:

      1. У ФУНКЦІЯХ-ОБРОБНИКАХ ПОДІЙ

              НАВІЩО: Коли потрібно перейти на іншу сторінку у відповідь на дію користувача, але ця дія не є звичайним
                      кліком по <NavLink> в меню

                      ТОБТО якщо нам потрібно щоб перехід на іншу сторінку відбувся після будь-якої іншої взаємодії,

                      НАПРИКЛАД:

                           ◦ Натисканні кнопки ("Купити", "Додати в кошик")

                           ◦ Кліку по картці товару чи іншому кастомному елементу

                           ◦ Відправленні форми (onSubmit)

                      В такому випадку використовують функцію navigate()
                                                              ‾‾‾‾‾‾‾‾‾‾

              ПРИКЛАД:

                     │ import { useNavigate } from "react-router-dom";
                     │
                     │ function ProductCard({ product }) {
                     │   const navigate = useNavigate();
                     │
                     │   const handleClick = () => {
                     │     ...                                  —>  будь-яка додаткова логіка перед переходом
                     │     navigate(`/products/${product.id}`);
                     │   };
                     │
                     │   return (
                     │      <div onClick={handleClick}>
                     │        <h3>{product.name}</h3>
                     │        <p>{product.price} ₴</p>
                     │      </div>
                     │   );
                     │ }


              ІНШИЙ ПРИКЛАД:

                     │ import { useNavigate } from 'react-router-dom';
                     │
                     │ export default function LogoutButton() {   —> функціональний компонент — кнопка
                     │   const navigate = useNavigate();
                     │
                     │   const handleLogout = () => {
                     │     localStorage.removeItem('token');
                     │     navigate('/login');                    —> переходимо на сторінку логіну (або на home page)
                     │   };
                     │
                     │   return <button onClick={handleLogout}>Log out</button>;
                     │ }


                              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ ↓ ↓ ↓ ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                                Це звичайна практика в React — виносити кнопку (або інший елемент з логікою) в окремий
                                компонент, ОСОБЛИВО КОЛИ:

                                    1.1  КНОПКА МАЄ ВЛАСНУ ЛОГІКУ:

                                            ◦ очищення токена

                                            ◦ перенаправлення (navigate())

                                            ◦ інші дії → тобто це вже розумна кнопка, не просто <button>


                                         Така логіка робить батьківський компонент занадто довгим, тож краще винести її
                                         в окремий компонент заради чистоти основного компонента

                                         ТОБТО якщо App, Header чи Sidebar стають занадто довгими — краще виносити
                                         частини в окремі компоненти


                                    1.2  КНОПКА ПОВТОРНО ВИКОРИСТОВУЄТЬСЯ

                                         Наприклад <LogoutButton /> можна вставити на кількох сторінках, і вона завжди:

                                            ◦ робить logout

                                            ◦ перекидає на /login

                              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


      2. ПІСЛЯ УСПІШНОГО ЗАПИТУ НА СЕРВЕР   —>  в .then() або await

              НАВІЩО: Щоб автоматично перенаправити користувача після виконання асинхронної операції


              ТИПОВІ СИТУАЦІЇ:

                  ◦ Після логіну —> перейти на сторінку профілю

                  ◦ Після оформлення замовлення —> перейти на сторінку "Дякуємо за покупку"

                  ◦ Після додавання нового поста —> перейти на сторінку з цим постом


              ПРИКЛАД:

                     │ import { useState } from 'react';
                     │ import { useNavigate } from 'react-router-dom';
                     │
                     │ async function loginUser(email, password) {
                     │   const res = await fetch('https://your-api.com/login', {
                     │       method: 'POST',
                     │       headers: {
                     │         'Content-Type': 'application/json',
                     │       },
                     │       body: JSON.stringify({ email, password }),
                     │     });
                     │
                     │     if (!res.ok) {
                     │       throw new Error('Invalid email or password');
                     │     }
                     │     return await res.json();
                     │ }
                     │
                     │ export default function LoginForm() {
                     │   const [email, setEmail] = useState('');
                     │   const [password, setPassword] = useState('');
                     │   const [error, setError] = useState(null);
                     │
                     │   const navigate = useNavigate();
                     │
                     │   const handleSubmit = async (e) => {
                     │     e.preventDefault();                 —>  щоб не було перезавантаження сторінки
                     │     setError(null);
                     │
                     │     try {
                     │       const res = await loginUser(email, password);
                     │       navigate('/profile');             —>  переходимо на сторінку профілю після логіну
                     │     } catch(err) {
                     │       setError(err.message)
                     │     }
                     │   };
                     │
                     │   return (
                     │     <form onSubmit={handleSubmit}>
                     │       <label>
                     │         <input
                     │           type="email"
                     │           value={email}
                     │           onChange={e => setEmail(e.target.value)}
                     │           placeholder="Email"
                     │           required
                     │         />
                     │       </label>
                     │       <label>
                     │         <input
                     │           type="password"
                     │           value={password}
                     │           onChange={e => setPassword(e.target.value)}
                     │           placeholder="Password"
                     │           required
                     │         />
                     │       </label>
                     │       {error && <p style={{color: 'red'}}>{error}</p>}
                     │       <button type="submit">Submit</button>
                     │     </form>
                     │   );
                     │ }



      3. У useEffect() ДЛЯ НАВІГАЦІЇ В Redirectors

            ◦ Застосовується в компонентах-редиректорах (Redirectors)
              ЇХ МЕТА: не пускати залогінених користувачів на публічні сторінки (/login, /signup)

            ◦ У таких випадках результат перевірки авторизації зберігається В ГЛОБАЛЬНОМУ СТАНІ (Redux, Context),
              а не в локальному useState

            ◦ Логіка навігації не знаходиться в самій сторінці форми (/login).
              Вона винесена в окремий утилітний компонент — Redirector

            ◦ Редиректор підписується на глобальний стан і у useEffect автоматично виконує navigate() при зміні цього
              стану


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                               У ПРОЄКТАХ ЗАЗВИЧАЙ Є ДВА ТИПИ ОХОРОНЦІВ СТОРІНОК:

 1. Route Guards (Protected Routes)
————————————————————————————————————

        ЩО ЦЕ: Компоненти-обгортки, які перевіряють, чи має користувач право бачити сторінку

        ДЕ ВИКОРИСТОВУЮТЬ: В описі маршрутів (App.js), огортаючи в них приватні сторінки

                  │ function App() {
                  │   return (
                  │     <Routes>
                  │       <Route path="/login" element={<LoginPage />} />     —>  Публічний маршрут
                  │
                  │       <Route                                              —>  Приватний маршрут
                  │         path="/profile"
                  │         element={
                  │           <PrivateRoute>
                  │             <ProfilePage />
                  │           </PrivateRoute>
                  │         }
                  │       />
                  │     </Routes>
                  │   );
                  │ }


        ЩО РОБЛЯТЬ:

            ◦ Перевіряють умову доступу (наприклад, чи користувач авторизований)

            ◦ Якщо умова виконується — повертають дочірній компонент (children)  —>  <ProfilePage />

            ◦ Якщо ні — повертають <Navigate /> для редиректу на потрібну сторінку (наприклад, /login) або іншу сторінку
                                                                                                           ‾‾‾‾‾‾‾‾‾‾‾‾‾


        КОЛИ ПОТРІБНІ:

            ◦ Кабінет користувача  —>  особистий профіль і налаштування, доступні тільки після входу

            ◦ Адмін-панель  —>  панель управління сайтом або додатком, доступна лише адміністраторам

            ◦ Сторінка замовлень  —>  інформація про замовлення та покупки, яку можуть бачити лише авторизовані юзери



 2. Redirectors
————————————————

        ЩО ЦЕ: Невеликі компоненти-тригери з useEffect, які перенаправляють авторизованих користувачів з публічних
               сторінок

        ДЕ ВИКОРИСТОВУЮТЬ: Всередині сторінки /login, /signup або інших публічних розділів


        ЩО РОБЛЯТЬ:

            ◦ Не пускають авторизованих користувачів у відкриті сторінки, такі як /login чи /signup
              Тобто якщо користувач вже авторизований —> перенаправляють на /profile або /dashboard

                  ◦ /dashboard — це сторінка панелі керування або особистого кабінету, де користувач
                    бачить важливу інформацію та керуючі елементи

            ◦ Повертають: null (нічого не відображають), бо їх завдання — лише виконати навігацію


                  ПРОБЛЕМА БЕЗ РЕДИРЕКТІВ: (LoginRedirector)

                      Якщо залогінений користувач відкриє сторінку логіну (/login) в якій немає логіки редиректу —>
                      він все одно побачить форму входу, хоча вже авторизований

                      Це нелогічно і створює поганий UX



                  ЩО РОБИТЬ РЕДИРЕКТ: (LoginRedirector)

                      1. Вставляється на сторінку логіну перед формою входу

                      2. Під час завантаження сторінки виконує свою логіку:

                            2.1  У useEffect перевіряє глобальний стан (наприклад: isLoggedIn з контексту або Redux)

                            2.2  Якщо користувач вже авторизований  —>  виконує редирект на сторінку профілю за
                                 допомогою navigate('/profile') або на іншу потрібну сторінку

                            2.3  Якщо ні  —>  нічого не показує (return null)  —>  форма логіну рендериться


                      3. І ГОЛОВНЕ: ця перевірка виконується автоматично при кожному рендері сторінки логіну



                  НАВІЩО ОКРЕМИЙ КОМПОНЕНТ:  (LoginRedirector)

                      Можна було б вставити цей useEffect прямо в LoginPage, але тоді код форми і логіки редиректу
                      перемішався б в одному місці

                      Окремий LoginRedirector:

                         ◦ чисто відповідає за редирект

                         ◦ можна вставити на будь-яку сторінку, яка має бути недоступною для залогінених користувачів



        КОЛИ ПОТРІБНИЙ:

            ◦ Щоб залогінений користувач не бачив форму входу

            ◦ Щоб при переході на /signup авторизований користувач одразу потрапляв у свій акаунт

                                         ↓ ↓ ↓

             Це покращує UX і запобігає плутанині (Чому я бачу форму входу, якщо я вже в системі?)



        ПРИКЛАД:

          LoginRedirector.js
         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                  │ import { useEffect } from 'react';
                  │ import { useNavigate } from 'react-router-dom';
                  │ import { useAuth } from './AuthContext';
                  │
                  │ function LoginRedirector() {
                  │   const { isLoggedIn } = useAuth();
                  │   const navigate = useNavigate();
                  │
                  │   useEffect(() => {
                  │     if (isLoggedIn) {
                  │       navigate('/profile', { replace: true });  ❗
                  │     }
                  │   }, [isLoggedIn, navigate]);
                  │
                  │   return null;
                  │ }

                               —————————————————————————————————————————————————————————————————————————————————————————
                                 ❗ Навідміну від компонента <Navigate /> в якого проп replace — це булевий атрибут,
                                     який можна просто написати так:

                                          <Navigate to="/profile" replace />  —>  replace означає replace={true}


                                     У navigate() другий аргумент — це об’єкт з налаштуваннями, де треба явно вказати:

                                          navigate('/profile', { replace: true })  —>  завжди передаємо об’єкт
                               —————————————————————————————————————————————————————————————————————————————————————————
          Login.js
         ‾‾‾‾‾‾‾‾‾‾

                  │ export default function Login() {
                  │   return (
                  │     <>
                  │       <LoginRedirector />
                  │       <LoginForm />
                  │     </>
                  │   );
                  │ }



 ПІДСУМОК:
            ◦ Route Guards захищають приватні сторінки від сторонніх користувачів

            ◦ Redirectors захищають публічні сторінки від вже залогінених користувачів



————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                                                    ПОРІВНЯННЯ:

  Властивість                     navigate()                                       <Navigate />
 ‾‾‾‾‾‾‾‾‾‾‾‾‾                   ‾‾‾‾‾‾‾‾‾‾‾‾                                     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  Тип                           Функція з useNavigate()                           Компонент

❗️Місце використання            JS-КОД  (усередині подій / ефектів)               JSX (усередині JSX як результат умови)

  Коли спрацьовує               Після виклику (наприклад, onClick, useEffect)     Автоматично при рендері

❗replace підтримка             { replace: true }                                 replace

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/