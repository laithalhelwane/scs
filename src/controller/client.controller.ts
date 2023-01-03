import { Request, Response } from 'express';
import {
  createClientInput,
  createClientLocationInput,
  createClientSessionInput,
  createOrderFavoriteInput,
  createOrderInput,
  createOrderRateInput,
  getClientLocationInput,
  getOrderInput,
  getOwnersInput,
  getServicesInput,
  updateClientInput
} from '../schema/client.schema';
import {
  createClientService,
  createClientSessionService,
  getClientService,
  updateClientService,
  createClientLocationService,
  getClinetLocationService,
  getOwnersService,
  getServicesService,
  createOrderService,
  getOrderService,
  createOrederRateService,
  createOrderFavoriteService,
  getOrdersService
} from '../service/client.service';
import { isUserInDatabase } from '../service/user.service';
import logger from '../util/logger';

export async function createClientSessionHandler(req: Request<{}, {}, createClientSessionInput['body']>, res: Response) {
  try {
    const session = await createClientSessionService(req.body, res.locals.ua);
    if (session == null) {
      return res.status(401).json({
        success: false,
        error_code: 401,
        message: 'Worng phoneNumber or password'
      });
    }
    res.status(201).json(session);
    return;
  } catch (error: any) {
    logger.error(error.message);
    res.status(409).json({});
  }
}

export async function createClientHandler(req: Request<{}, {}, createClientInput['body']>, res: Response) {
  try {
    const isInDatabase = await isUserInDatabase({ phoneNumber: req.body.phoneNumber });
    if (isInDatabase) {
      return res.status(409).json({
        error: true,
        error_message: 'phoneNumber already used'
      });
    }
    const client = await createClientService(req.body);
    return res.status(201).json(client);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(409).json(error.message);
  }
}
export async function getClientHandler(req: Request, res: Response) {
  try {
    const client = await getClientService(res.locals.client.userId);
    return res.json(client);
  } catch (error: any) {
    return res.status(409).json(error.message);
  }
}
export async function updateClientHandler(req: Request<{}, {}, updateClientInput['body']>, res: Response) {
  try {
    const client = await updateClientService({ id: res.locals.client.userId }, req.body);
    if (client === null) {
      return res.status(404).json({});
    }
    return res.json(client);
  } catch (error: any) {
    return res.status(409).json(error.message);
  }
}

export async function createClinetLocationHandler(req: Request<{}, {}, createClientLocationInput['body']>, res: Response) {
  try {
    const location = await createClientLocationService(req.body, {
      user_id: res.locals.client.id
    });
    return res.status(201).json(location);
  } catch (error: any) {
    return res.status(409).json(error.message);
  }
}

export async function getClinetLocationHandler(req: Request<getClientLocationInput['parmas']>, res: Response) {
  try {
    const location = await getClinetLocationService(req.params);
    return location;
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function getOwnersHandler(req: Request<{}, {}, getOwnersInput['body']>, res: Response) {
  try {
    const owners = await getOwnersService({ id: req.body.locationId });
    return res.json(owners);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function getServicesHandler(req: Request<getServicesInput['params']>, res: Response) {
  try {
    const services = await getServicesService({ ownerUser_id: req.params.id });
    return res.json(services);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
export async function createOrederHandler(req: Request<createOrderInput['params'], {}, createOrderInput['body']>, res: Response) {
  try {
    const order = await createOrderService({ user_id: res.locals.client.id }, { user_id: req.params.id }, req.body);
    return res.json(order);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function getOrderHandler(req: Request<getOrderInput['params']>, res: Response) {
  try {
    const order = await getOrderService({ id: req.params.id });
    return res.json(order);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function createOrderRateHandler(req: Request<createOrderRateInput['params'], {}, createOrderRateInput['body']>, res: Response) {
  try {
    const rate = await createOrederRateService({ user_id: res.locals.client?.id as number }, req.params, req.body);
    return res.status(201).json(rate);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function createOrderFavoriteHandler(req: Request<createOrderFavoriteInput['params']>, res: Response) {
  try {
    const favorite = await createOrderFavoriteService(
      {
        user_id: res.locals.client.id
      },
      { user_id: req.params.id }
    );
    return res.status(201).json(favorite);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}

export async function getOrdersHandler(req: Request, res: Response) {
  try {
    const orders = await getOrdersService({ clientUser_id: res.locals.client.id });
    return res.status(200).json(orders);
  } catch (err: any) {
    return res.status(409).json(err.message);
  }
}
