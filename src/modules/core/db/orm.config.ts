import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'node:process';
import { SeederOptions } from 'typeorm-extension';

config({
  path: '.env'
});

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: ['src/modules/core/db/migrations/**'],
  entities: ['dist/**/*.entity.js'],
  seeds: ['dist/src/modules/core/db/seeds/*.js'],
  factories: ['dist/modules/core/db/factories/*.js']
};
export const dataSource = new DataSource(options);
dataSource.initialize().catch((error) => console.log(error));
