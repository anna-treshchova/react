import express from 'express';
import cors from 'cors';

const app = express();

import destinationsRouter from './routes/destination.js';
import hotelsRouter from './routes/hotels.js';

app.use(cors());
app.use(express.json());

app.use('/destinations', destinationsRouter);
app.use('/hotels', hotelsRouter);

export default app;