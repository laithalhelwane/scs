import { Express } from 'express';
import clientRouter from './router/client.router';
import ownerRouter from './router/owner.router';
import deliveryRouter from './router/delivery.router';
import adminRouter from './router/admin.router';
export default function routes(app: Express) {
  app.use('/c', clientRouter);
  app.use('/o', ownerRouter);
  app.use('/d', deliveryRouter);
  app.use('/a', adminRouter);
}
