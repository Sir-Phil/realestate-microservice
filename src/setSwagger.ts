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
    // servers: [
    //   {
    //     url: 'http://localhost:5000', // Replace with your server URL
    //   },
    // ],
  },
  apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'], // Adjust the path according to your project structure
};

const swaggerSpec = swaggerJsdoc(options);

export const setSwaggerDocs = (app: Application) => {
  // Serve Swagger UI at the /docs endpoint
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Serve the Swagger specification in JSON format at the /docs.json endpoint
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
