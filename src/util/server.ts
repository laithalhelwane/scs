import express, { Express } from 'express';
import cors from 'cors';
import { deserializeUser } from '../middleware/deserializeJWT';
import getUserAgent from '../middleware/getUserAgent';

function createServer(): Express {
  const app = express();
  app.use(
    cors({
      origin: '*',
      methods: 'GET,PATCH,POST,DELETE'
    })
  );
  app.use(express.json());
  app.use(deserializeUser);
  app.use(getUserAgent);
  return app;
}
export default createServer;
