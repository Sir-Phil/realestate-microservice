import express, { Express } from 'express';
import path from 'path';

export const setStatic = (app: Express): void => {
  // We serve uploaded files
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
};
