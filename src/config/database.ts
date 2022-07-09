import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  applicationName: 'yellow-dolphin',
  installExtensions: true,
  logNotifications: true,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: false,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  logging: false,
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  autoLoadEntities: true,
});

const dataSource = new DataSource({ ...(dbConfig() as DataSourceOptions) });

// export default dbConfig();
export default dataSource;
export { dbConfig };
