import express from 'express';
import {
  createDeliveryHandler,
  createDeliverySessionHandler,
  getPendingOrdersHandler,
  getDeliveryOrdersHandler,
  changeDeliveryOnlineHandler
} from '../controller/delivery.controller';
import requireDelivery from '../middleware/requireDelivery';
import validate from '../middleware/validateResource';
import { changeDeliveryOnlineSchema, createDeliverySchema, createDeliverySessionSchema } from '../schema/delivery.schema';
const router = express.Router();
router.post('/delivery', validate(createDeliverySchema), createDeliveryHandler);
router.post('/auth', validate(createDeliverySessionSchema), createDeliverySessionHandler);
router.get('/order', requireDelivery, getPendingOrdersHandler);
router.get('/order/me', requireDelivery, getDeliveryOrdersHandler);
router.put('/delivery/online', [requireDelivery, validate(changeDeliveryOnlineSchema)], changeDeliveryOnlineHandler);
export default router;
