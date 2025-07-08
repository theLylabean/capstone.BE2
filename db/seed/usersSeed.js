import db from '../client.js';
import bcrypt from 'bcrypt';

export async function usersSeed() {
    try {
        const lylapassword = await bcrypt.hash('421aters', 5);
        const justinpassword = await bcrypt.hash('Triforce3!', 5);
        const nancypassword = await bcrypt.hash('itsnancyq', 5);

        await db.query('TRUNCATE users RESTART IDENTITY CASCADE');
        await db.query(`
            INSERT INTO users (first_name, last_name, email, username, password) VALUES
                ($1, $2, $3, $4, $5),
                ($6, $7, $8, $9, $10),
                ($11, $12, $13, $14, $15)
            `, [
                    'Nanncy',
                    'Quinonez',
                    'itsnancyq@gmail.com',
                    'itsnancyq',
                    nancypassword,    

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
                const result = await db.query(`SELECT * FROM users`);
                console.log("Seeded users:", result.rows);
        console.log('🌱 Database seeded.');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } 
}