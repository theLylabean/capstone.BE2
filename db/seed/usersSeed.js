import db from '../client.js';
import bcrypt from 'bcrypt';

export async function usersSeed(db) {
    try {
        const lylapassword = await bcrypt.hash('421aters', 5);
        const justinpassword = await bcrypt.hash('Triforce3!', 5);
        await db.query(`
            DELETE FROM users;

            INSERT INTO users (first_name, last_name, email, username, password) VALUES
                ($1, $2, $3, $4, $5),
                ($6, $7, $8, $9, $10)
            `, [
                    'Lyla',
                    'Lynn',
                    'dawnie88@gmail.com',
                    'thelylabean',
                    lylapassword,
                
                    'Justin',
                    'Lynn',
                    'justinryanlynn@gmail.com',
                    'drjustus',
                    justinpassword
                ]);
        console.log('🌱 Database seeded.');
    } catch (error) {
        console.error('❌ Seeding failed:', err);
    } 
}