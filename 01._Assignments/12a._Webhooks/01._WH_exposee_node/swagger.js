import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Webhook API',
      version: '1.0.0',
      description: 'Expose and register webhooks for invoice events'
    }
  },
  apis: ['./server.js'] // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);