import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      description: 'Express Swagger API documentation.',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
  },
  apis: ['./routes/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export const setSwagger = (app: Express): void => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
