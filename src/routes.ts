import { Express } from 'express';
import swaggerUi from 'swagger-ui-express'
import clientRouter from './router/client.router';
import ownerRouter from './router/owner.router';
import deliveryRouter from './router/delivery.router';
import adminRouter from './router/admin.router';
import swaggerDoc from '../swagger.json';
export default function routes(app: Express) {
  app.use('/c', clientRouter);
  app.use('/o', ownerRouter);
  app.use('/d', deliveryRouter);
  app.use('/a', adminRouter);
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc) )
}
