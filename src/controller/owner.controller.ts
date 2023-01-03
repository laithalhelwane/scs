import { Request, Response } from 'express';
import {
  createOwnerInput,
  createOwnerSessionInput,
  createServiceInput,
  deleteServiceInput,
  updateAddtionalServiceInput,
  updateOrderStatusInput,
  updateServiceInput
} from '../schema/owner.schema';
import {
  createOwnerService,
  createOwnerSessionService,
  getOwnerService,
  createServiceService,
  deleteServiceService,
  updateServiceService,
  updateAddtionalServiceService,
  getOrdersService,
  updateOrderStatusService
} from '../service/owner.service';

export async function createOwnerHandler(req: Request<{}, {}, createOwnerInput['body']>, res: Response) {
  try {
    const owner = await createOwnerService(req.body);
    return res.status(201).json(owner);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function createOwnerSessionHandler(req: Request<{}, {}, createOwnerSessionInput['body']>, res: Response) {
  try {
    const session = await createOwnerSessionService(req.body);
    return res.status(201).json(session);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function getOwnerHandler(req: Request, res: Response) {
  try {
    const owner = await getOwnerService({ user_id: res.locals.owner.userId });
    return res.json(owner);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function createServiceHandler(req: Request<{}, {}, createServiceInput['body']>, res: Response) {
  try {
    const service = await createServiceService(req.body, { id: res.locals.owner.userId });
    return res.status(201).json(service);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function deleteServiceHandler(req: Request<deleteServiceInput['params'], {}, {}>, res: Response) {
  try {
    const service = await deleteServiceService({ id: +req.params.id });
    return res.status(200).json(service);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function updateServiceHandler(req: Request<updateServiceInput['params'], {}, updateServiceInput['body']>, res: Response) {
  try {
    const serivce = await updateServiceService({ id: +req.params.id }, req.body);
    return res.status(200).json(serivce);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function updateAddtionalServiceHandler(
  req: Request<updateAddtionalServiceInput['params'], {}, updateAddtionalServiceInput['body']>,
  res: Response
) {
  try {
    // TODO Fix me please baby
    const addtionalSerivce = await updateAddtionalServiceService(
      {
        id: +req.params.id
      },
      req.body
    );
    return res.status(200).json(addtionalSerivce);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function getOrdersHandler(req: Request, res: Response) {
  try {
    const orders = await getOrdersService({ clientUser_id: res.locals.owner.userId });
    return res.json(orders);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function updateOrderStatusHandler(req: Request<updateOrderStatusInput['params'], {}, updateOrderStatusInput['body']>, res: Response) {
  try {
    const order = await updateOrderStatusService({ id: +req.params.id }, { orderStatus: req.body.orderStatus });
    return res.json(order);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
