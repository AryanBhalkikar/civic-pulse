import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = (process.env.NODE_ENV === 'production')?
    process.env.DATABASE_URL : process.env.DATABASE_URL_LOCAL;

const pool = new pg.Pool({ connectionString });

export default pool;