import express from 'express';
import {
  createClientHandler,
  createClientSessionHandler,
  getClientHandler,
  updateClientHandler,
  createClinetLocationHandler,
  getClinetLocationHandler,
  getOwnersHandler,
  getServicesHandler,
  createOrederHandler,
  getOrderHandler,
  createOrderRateHandler,
  createOrderFavoriteHandler,
  getOrdersHandler
} from '../controller/client.controller';
import requireClient from '../middleware/requireClient';
import validate from '../middleware/validateResource';
import {
  createClientSchema,
  createClientSessionSchema,
  updateClientSchema,
  createClientLocationSchema,
  getClientLocationSchema,
  getOwnersSchema,
  getServicesSchema,
  createOrderSchema,
  getOrderSchema,
  createOrderRateSchema,
  createOrderFavoriteSchema
} from '../schema/client.schema';
const router = express.Router();

router.post('/client', validate(createClientSchema), createClientHandler);
router.post('/auth', validate(createClientSessionSchema), createClientSessionHandler);
// router.post('/auth', requireClient, deleteClientSessionHandler)
router.get('/client', requireClient, getClientHandler);
router.put('/client', [requireClient, validate(updateClientSchema)], updateClientHandler);
router.post('/location', [requireClient, validate(createClientLocationSchema)], createClinetLocationHandler);
router.get('/location/:id', [requireClient, validate(getClientLocationSchema)], getClinetLocationHandler);
// TODO Fix getOwnersQuery
router.get('/owner', [requireClient], getOwnersHandler);
router.get('/owner/:id/service', [requireClient, validate(getServicesSchema)], getServicesHandler);
router.post('/order', [requireClient, validate(createOrderSchema)], createOrederHandler);
router.get('/order/:id', [requireClient, validate(getOrderSchema)], getOrderHandler);
router.post('/order/:id/rate', [requireClient, validate(createOrderRateSchema)], createOrderRateHandler);
router.post('/owner/:id/favorite', [requireClient, validate(createOrderFavoriteSchema)], createOrderFavoriteHandler);
router.get('/order', requireClient, getOrdersHandler);
export default router;
