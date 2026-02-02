import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({
  path: '.env'
});

export default new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: ['dist/migrations/**'],
  entities: ['dist/**/*.entity.js']
});
