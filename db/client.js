import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined in .env");
}

const db = new Client(process.env.DATABASE_URL);

await db.connect();

export default db;
