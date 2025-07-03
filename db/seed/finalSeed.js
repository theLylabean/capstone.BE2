import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

import { usersSeed } from "./usersSeed.js";

const { Pool } = pg;
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runSeeds() {
    try {
        await usersSeed(db);
        console.log('🌱 All seed data inserted successfully!');
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        await db.end();
    }
}

runSeeds();