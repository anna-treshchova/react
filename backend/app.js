import express from 'express';
import cors from 'cors';

import sectionsRouter from './routes/sections.js';
import profileRouter from './routes/profile.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/cv/sections', sectionsRouter);
app.use('/cv/profile', profileRouter);

export default app;

