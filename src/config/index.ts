import { MongooseModuleOptions } from '@nestjs/mongoose';

import { dbConfig } from './database';

interface IConfig {
  port: number;
  database: MongooseModuleOptions;
  keys: {
    privateKey: string;
    publicKey: string;
  };
}

export default (): Partial<IConfig> => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  keys: {
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
    publicKey: process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
  },
  database: dbConfig(),
});
