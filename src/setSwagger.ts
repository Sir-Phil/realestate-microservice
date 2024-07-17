import { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '0.1.0',
      description: 'Express Swagger API documentation.',
    },
  },
  apis: ['./routes/*.ts', './controllers/*.ts'], // Adjust the path according to your project structure
};

const swaggerSpec = swaggerJsdoc(options);

export const setSwaggerDocs = (app: Application) => {
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/doc.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

