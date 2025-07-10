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

export async function updateUser({id, first_name, last_name, email, password}) {
    try {
        const fields = [];
        const values = [];
        let paramIdx = 1;
        if (first_name) {
            fields.push(`first_name = $${paramIdx++}`);
            values.push(first_name)
        }
        if (last_name) {
            fields.push(`last_name = $${paramIdx++}`);
            values.push(last_name);
        }
        if (email) {
            fields.push(`email = $${paramIdx++}`);
            values.push(email);
        }
        if (password) {
            fields.push(`password = $${paramIdx++}`);
            values.push(password);
        }
        if (fields.length === 0) {
            throw new Error('No fields provided to update.');
        }
        const result = await db.query(
            `UPDATE users SET
                ${fields.join(', ')}
            WHERE id = $${paramIdx}
            RETURNING *;`,
            [...values, id]
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
