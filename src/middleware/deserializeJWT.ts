import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../util/jwt';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  if (accessToken.length === 0) {
    return next();
  }
  const { expired, decoded } = verifyJwt(accessToken);
  if (decoded != null && !expired) {
    if (decoded.userType === 'c') {
      res.locals.client = decoded;
    } else if (decoded.userType === 'a') {
      res.locals.admin = decoded;
    } else if (decoded.userType === 'd') {
      res.locals.delivery = decoded;
    } else if (decoded.userType === 'o') {
      res.locals.owner = decoded;
    }
    return next();
  }

  return next();
};
