import 'dotenv/config';
import { Pool } from 'pg';

const sql = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default sql;