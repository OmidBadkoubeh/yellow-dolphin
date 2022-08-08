import { MongooseModuleOptions } from '@nestjs/mongoose';
import { MulterModuleOptions } from '@nestjs/platform-express';

import { dbConfig } from './database';
import multerConfig from './multer';

interface IConfig {
  port: number;
  database: MongooseModuleOptions;
  multer: MulterModuleOptions;
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
  multer: multerConfig,
});
