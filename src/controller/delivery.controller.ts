import { Request, Response } from 'express';
import { changeDeliveryOnlineInput, createDeliveryInput, createDeliverySessionInput } from '../schema/delivery.schema';
import {
  createDeliverSessionService,
  createDeliveryService,
  changeDeliveryOnlineService,
  getDeliveryOrdersService,
  getPendingOrdersService
} from '../service/delivery.service';

export async function createDeliveryHandler(req: Request<{}, {}, createDeliveryInput['body']>, res: Response) {
  try {
    const delivery = await createDeliveryService(req.body);
    return res.status(201).json(delivery);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function createDeliverySessionHandler(req: Request<{}, {}, createDeliverySessionInput['body']>, res: Response) {
  try {
    const session = await createDeliverSessionService(req.body);
    if(session == null){
      return res.status(401).json({
        success: false,
        error_code: 401,
        message: 'Worng phoneNumber or password'
      });
    }
    return res.status(201).json(session);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function getPendingOrdersHandler(req: Request, res: Response) {
  try {
    const orders = await getPendingOrdersService();
    return res.json(orders);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function getDeliveryOrdersHandler(req: Request, res: Response) {
  try {
    const orders = await getDeliveryOrdersService({ userId: res.locals.delivery.id });
    return res.json(orders);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function changeDeliveryOnlineHandler(req: Request<{}, {}, changeDeliveryOnlineInput['body']>, res: Response) {
  try {
    const delivery = await changeDeliveryOnlineService({ userId: res.locals.delivery.userId }, req.body);
    return res.json(delivery);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
