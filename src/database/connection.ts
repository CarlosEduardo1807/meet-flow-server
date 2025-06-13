import { Pool } from 'pg';
import 'dotenv/config';

const sql = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default sql;