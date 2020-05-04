import 'reflect-metadata';
import '@shared/infra/typeorm';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

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
