import { Request, Response } from 'express';
import { updateDeliveryStatusInput } from '../schema/admin.schema';
import { getOwnersAdminService, getPendingDeliveryService, updateDeliveryStatusService } from '../service/admin.service';

export async function getPendingDeliveryHandler(req: Request, res: Response) {
  try {
    const delivery = await getPendingDeliveryService();
    return res.json(delivery);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function updateDeliveryStatusHandler(
  req: Request<updateDeliveryStatusInput['params'], {}, updateDeliveryStatusInput['body']>,
  res: Response
) {
  try {
    const delivery = await updateDeliveryStatusService({ userId: req.params.id }, req.body);
    return res.json(delivery);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function getOwnersAdminHandler(req: Request, res: Response) {
  try {
    const owner = await getOwnersAdminService();
    return res.json(owner);
  } catch (err: any) {}
}
