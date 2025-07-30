import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './Header.module.css';

export default function Header() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${styles.header} ${styles[`mode-${theme}`]}`}>
            <h1>Header: {theme}</h1>
        </div>
    )
}

/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                                                   МОДУЛЬНИЙ CSS
                                       (Header.module.css / Header.module.scss)


 Модульний CSS (CSS Modules) — це підхід, при якому:

       ◦ кожен CSS-файл прив’язаний до конкретного компонента

       ◦ і його класи автоматично ізольовані (мають унікальні імена після компіляції)

 ТОБТО: класи з одного модуля не конфліктують з класами інших модулів


 ЯК ПРАЦЮЄ:

      1. Імпортуємо стилі  —>  import styles from './Header.module.scss';


      2. Білдер (наприклад, Webpack або Vite) виконує 3 кроки:

         2.1  Перетворює .scss на .css (якщо використовуємо SCSS)


         2.2  Генерує унікальні назви класів:  .header  →  .Header_header__a1b2c

              І створює JS-об’єкт styles (це об’єкт відповідностей, де ключі — це імена класів із файлу, а значення —
              згенеровані унікальні назви класів)

                styles = {
                  header: 'Header_header__a1b2c',
                  'mode-dark': 'Header_mode-dark__x9y8z'
                }

         2.3  Додає стилі у спільний CSS-бандл, й тепер класи в ньому будуть виглядати так:

                .Header_header__a1b2c {
                  color: red;
                }

                .Header_mode-dark__x9y8z {
                  background: black;
                }


                                    Header.css  —>  Header.module.css
                                   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 Перейменування на Header.css на Header.module.css — це сигнал для бандлера (Webpack чи Vite), що цей файл треба
 обробляти як модуль.


 Header.css — звичайний глобальний стиль:
‾‾‾‾‾‾‾‾‾‾‾‾

     ◦ Глобальні стилі — застосовуються до всього проєкту

     ◦ Класи доступні скрізь, без імпорту

     ◦ Можливі конфлікти: один .header може перезаписати інший

     ◦ Застосування у компоненті: <div className="footer">...</div>


 Footer.module.css — модульний стиль:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

     ◦ Ізольовані стилі — працюють тільки в межах компонента

          Це означає що класи з Header.module.css не доступні за межами компонента Header.js,
          якщо ми явно їх не імпортуємо

     ◦ Класи доступні тільки через import styles from './Header.module.css'

     ◦ Кожен клас має унікальне згенероване ім’я, тому немає конфліктів

     ◦ Застосування у компоненті: <div className={styles.footer}>...</div>

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/