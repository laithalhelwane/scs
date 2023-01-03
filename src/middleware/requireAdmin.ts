import { Request, Response, NextFunction } from 'express';

const requireClient = (req: Request, res: Response, next: NextFunction) => {
  const { admin } = res.locals;
  if (admin === undefined) {
    return res.status(403).json({ success: false, error_code: 403, message: 'Not Authorized' });
  }
  return next();
};
export default requireClient;
