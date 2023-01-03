import { Request, Response, NextFunction } from 'express';
export default function getUserAgent(req: Request, res: Response, next: NextFunction) {
  res.locals.ua = req.get('User-Agent') ?? '';
  next();
}
