import express from 'express';
import { getPendingDeliveryHandler, updateDeliveryStatusHandler, getOwnersAdminHandler } from '../controller/admin.controller';
import requireAdmin from '../middleware/requireAdmin';
import validate from '../middleware/validateResource';
import { updateDeliveryStatusSchema } from '../schema/admin.schema';

const router = express.Router();

router.get('/delivery', requireAdmin, getPendingDeliveryHandler);
router.put('/delivery/:id', [requireAdmin, validate(updateDeliveryStatusSchema)], updateDeliveryStatusHandler);
router.get('/owner', requireAdmin, getOwnersAdminHandler);
export default router;
    