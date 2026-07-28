import express from 'express';
import cors from 'cors';
import { errorHandler } from '#shared/errors/index.js';

export const app = express();

import { destinationsRouter } from '#modules/destinations/index.js';
import { hotelsRouter } from '#modules/hotels/index.js';
import { authRouter } from '#modules/auth/index.js';
import { usersRouter } from '#modules/users/index.js';
import { wishlistRouter } from '#modules/wishlist/index.js';

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/wishlist', wishlistRouter);

app.use('/destinations', destinationsRouter);
app.use('/hotels', hotelsRouter);


app.use(errorHandler);
