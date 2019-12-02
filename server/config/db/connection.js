import 'dotenv/config';
import { Pool } from 'pg';
import config from './config';


const pool = new Pool({
  connectionString: config(process.env.NODE_ENV).databaseUrl,
});

export default pool;
