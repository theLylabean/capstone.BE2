import db from '../client.js';

export async function followUser(followingUserId, followedUserId) {
    try {
        const result = await db.query(
            `INSERT INTO following (following_user_id, followed_user_id)
            VALUES ($1, $2)
            RETURNING *;`,
            [followingUserId, followedUserId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error following user', error);
        throw error;
    }
}

export async function unfollowUser(followingUserId, followedUserId) {
    try {
        const result = await db.query(
            `DELETE FROM following WHERE
                following_user_id = $1
                AND
                followed_user_id = $2
                RETURNING *;`,
                [followingUserId, followedUserId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error unfollowing user', error);
        throw error;
    }
}

// who is following the user...what was i thinking when i named these seriously
export async function getFollowers(followedUserId) {
    try {
        const result = await db.query(
            `SELECT * FROM users WHERE
            followed_user_id = $1
            RETURNING *;`,
            [followedUserId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error getting followers.', error);
        throw error;
    }
}

// who the user is following...why i named it this idk.
export async function getFollowing(followingUserId) {
    try {
        const result = await db.query(
            `SELECT * FROM users WHERE
            following_user_id = $1
            RETURNING *;`,
            [followingUserId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error getting following list.', error);
    }
}

export async function getFollowStatus(followingUserId, followedUserId) {
    try {
        const result = await db.query(
            `SELECT EXISTS (
            SELECT 1
            FROM following
            WHERE following_user_id = $1 AND followed_user_id = $2
            )`,
            [followingUserId, followedUserId]
        );
        return result.rows[0].exists; //returns a boolean
    } catch (error) {
        console.error('Error getting follow status.', error);
    }
}