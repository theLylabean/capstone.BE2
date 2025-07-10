import db from '../client.js';

export async function followUser(following_user_id, followed_user_id) {
    try {
        const result = await db.query(
            `INSERT INTO following (following_user_id, followed_user_id)
            VALUES ($1, $2)
            RETURNING *;`,
            [following_user_id, followed_user_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error following user', error);
        throw error;
    }
}

export async function unfollowUser(following_user_id, followed_user_id) {
    try {
        const result = await db.query(
            `DELETE FROM following WHERE
                following_user_id = $1
                AND
                followed_user_id = $2
                RETURNING *;`,
                [following_user_id, followed_user_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error unfollowing user', error);
        throw error;
    }
}