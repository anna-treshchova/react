import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


import ThemeProvider from './contexts/ThemeContext';

import App from './App';

import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider>
              <App />
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);


/*
 <BrowserRouter> — це компонент, без якого не працює React Router  —>  він вмикає роутинг у додатку

 Ми обгортаємо увесь додаток у <BrowserRouter>, щоб всередині App можна було використовувати логіку маршрутизаціїї
 цієї бібліотеки, А САМЕ:

     ◦ використовувати маршрути (<Routes>, <Route>)

     ◦ переходити між сторінками (<Link>, useNavigate())

 Без обгортання додату у <BrowserRouter> React Router просто не працюватиме — він не знатиме, який URL активний
*/



