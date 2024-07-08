import cors from 'cors';
import { Express } from 'express';

export const setCors = (app: Express) => {
  app.use(
    cors({
      origin: [
        'http://localhost:5000',
        'http://localhost:8100',
        'http://localhost:4200',
      ],
      // Add other options here if needed
    })
  );
};
