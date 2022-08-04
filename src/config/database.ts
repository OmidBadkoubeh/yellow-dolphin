import { MongooseModuleOptions } from '@nestjs/mongoose';

export const dbConfig = (): MongooseModuleOptions => ({
  appName: process.env.APP_NAME,
  dbName: process.env.DB_NAME,
  uri: process.env.MONGO_URI,
});

export default dbConfig();
