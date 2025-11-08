import express from 'express';   // імпортуємо функцію express з бібліотеки Express
import cors from 'cors'          // імпортуємо функцію cors з бібліотеки Cors

const app = express()            // створюємо додаток (майбутній сервер) ↓

/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 1. express() — виклик функції express створює новий екземпляр додатку від внутрішнього конструктора Express —
    application (об'єкт з методами)

    Це наш майбутній сервер, який ще не слухає порт, але вже готовий приймати налаштування (routes, middleware тощо)

 2. const app — змінна, в яку ми зберігаємо цей додаток (об’єкт із методами для керування сервером):

         2.1  app.use(middleware)  —> підключення middleware до додатку


         2.2  app.get('/path', handler)  —> створення route (маршруту) для обробки GET-запиту за endpoint /path

         2.3  app.post('/path', handler)  —> створення route (маршруту) для POST-запиту за endpoint /path


         2.4  app.listen(port, () => {})  —> запуск сервера (сервер починає прослуховувати порт)

         2.5  app.use((err, req, res, next) => {...})  —> обробка помилок


 ВАЖЛИВО: express() створює додаток, але сервером він стає тільки після app.listen(port, () => {})

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/

// імпорт роутів
import destinationRoutes from '#routes/destinations.js'
import eventRoutes from '#routes/events.js'
import searchRoutes from '#routes/search.js'
import authRoutes from '#routes/auth.js'

// підключення middleware
app.use(cors());
app.use(express.json());


// підключення маршрутів
app.use('/destinations', destinationRoutes);
app.use('/events', eventRoutes);
app.use('/search', searchRoutes);
app.use('/auth', authRoutes);

export default app;
