import { Pool } from 'pg';
import config from '../middleware/config';

const pool = new Pool({
  host: config.PG_HOST,
  port: config.PG_PORT,
  database: config.PG_DATABASE_DEV,
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  max: 4,
});

pool.on('error', (error: Error): void => {
  console.error(error.message);
});

export default pool;
