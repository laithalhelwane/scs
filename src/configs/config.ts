import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const config = {
  jwt: {
    privateKey: process.env.PRIVATE_KEY as string,
    publicKey: process.env.PUBLIC_KEY as string,
    saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR ?? '10', 10)
  },
  app: {
    port: process.env.PORT ?? (1337 as number)
  }
};

export default config;
