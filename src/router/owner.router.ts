import express from 'express';
import validate from '../middleware/validateResource';
import {
  createOnwerSessionSchema,
  createOwnerSchema,
  createServiceSchema,
  deleteServiceSchema,
  updateAddtionalServiceSchema,
  updateServiceSchema,
  updateOrderStatusSchema
} from '../schema/owner.schema';
import {
  createOwnerHandler,
  createOwnerSessionHandler,
  getOwnerHandler,
  createServiceHandler,
  deleteServiceHandler,
  updateServiceHandler,
  updateAddtionalServiceHandler,
  getOrdersHandler,
  updateOrderStatusHandler
} from '../controller/owner.controller';
import requireOwner from '../middleware/requireOwner';
const router = express.Router();
router.post('/owner', validate(createOwnerSchema), createOwnerHandler);
router.post('/auth', validate(createOnwerSessionSchema), createOwnerSessionHandler);
router.get('/owner', requireOwner, getOwnerHandler);
router.post('/service', requireOwner, validate(createServiceSchema), createServiceHandler);
router.delete('/service/:id', requireOwner, validate(deleteServiceSchema), deleteServiceHandler);
router.put('/service/:id', requireOwner, validate(updateServiceSchema), updateServiceHandler);
router.get('/order', requireOwner, getOrdersHandler);
// TODO: test me
router.put('/order/:id', [requireOwner, validate(updateOrderStatusSchema)], updateOrderStatusHandler);
// TODO: Fix Me
// router.put('/service/:id/aservice/:a_id', validate(updateAddtionalServiceSchema), updateAddtionalServiceHandler);

export default router;
