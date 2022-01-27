
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const openapiSpecification = swaggerJsdoc(
    {
        definition: {
          openapi: '3.0.0',
          info: {
            version: '1.0',
            title: 'T-market',
          },
          servers:[ {url:'http://localhost:5000/api'}]
        },
        apis : ['./src/infrastructure/routes/*.ts', './src/domain/models/*.ts']  // files containing annotations as above
      }
);

export const  swaggerServe = swaggerUi.serve;
export const swaggerSetup  = swaggerUi.setup(openapiSpecification);