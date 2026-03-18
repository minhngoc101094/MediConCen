import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserMapping } from './src/user/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [UserMapping],
  migrations: ['src/migrations/*.ts']
});
