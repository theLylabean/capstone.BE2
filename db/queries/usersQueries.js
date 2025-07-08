import db from '../client.js';

export async function createUsers(first_name, last_name, email, username, password) {
    try {
        const result = await db.query(
            `INSERT INTO users (first_name, last_name, email, username, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`,
            [first_name, last_name, email, username, password]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
}

export async function newUsernameCheck(username) {
    try {
        const result = await db.query(
            `SELECT * FROM  users WHERE username =$1`, [username]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error checking username.', error.message);
        throw error;
    }
}

export async function newEmailCheck(email) {
    try {
        const result = await db.query(
            `SELECT * FROM users WHERE email =$1`, [email]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error checking email.', error.message);
        throw error;
    }
}

export async function getLogin(username) {
    try {
        const result = await db.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        );
        return result;
    } catch (error) {
        console.error('Error loggin in', error.message);
        throw error;
    }
}

export async function getUserById(id) {
    try {
        const result = await db.query(
            `SELECT * FROM users WHERE id = $1`, 
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error getting user by id', error.message);
        throw error;
    }
}

export async function updateUser(id, first_name, last_name, email, password) {
    try {
        const result = await db.query(
            `UPDATE users SET
                first_name = $1,
                last_name = $2,
                email = $3,
                password = $4
            WHERE id = $5
            RETURNING *;`,
            [first_name, last_name, email, password, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user by ID', error.message);
        throw error;
    }
}

export async function deleteUser(id) {
    try {
        const result = await db.query(
            `DELETE FROM users WHERE id = $1
            RETURNING *;`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting user', error.message);
        throw error;
    }
}
