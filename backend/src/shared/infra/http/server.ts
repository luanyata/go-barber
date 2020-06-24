import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import storageConfig from '@config/storage';
import rateLimiter from './middlewares/rateLimeter';

import '@shared/infra/typeorm';
import routes from './routes';

import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(storageConfig.uploadsFolder));

app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => console.log('🚀 Server on start on port 3333'));
