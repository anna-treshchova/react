import express from 'express';
import cors from 'cors';

import todosRouter from './routes/todos.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/todos', todosRouter); // підключаємо всі маршрути з routes/todos.js

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
