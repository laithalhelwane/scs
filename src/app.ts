import config from './configs/config';
import createServer from './util/server';
import logger from './util/logger';
import routes from './routes';
const app = createServer();
const {
  app: { port }
} = config;
app.listen(port, () => {
  routes(app);
  logger.info(`check your app http://localhost:${port}`);
});
