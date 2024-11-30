import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'node:process';
import { SeederOptions } from 'typeorm-extension';

config({
  path: '.env'
});

export const typeOrmOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: ['src/database/migrations/**'],
  entities: ['dist/**/*.entity.js'],
  seeds: ['dist/src/database/seeds/**.js']
};

export const dataSource = new DataSource(typeOrmOptions);
dataSource.initialize();
