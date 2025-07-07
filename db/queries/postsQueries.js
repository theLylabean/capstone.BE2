import db from '../client.js'

export async function getAllPostsQuery() {
  const query = `
    SELECT posts.*, users.username 
    FROM posts 
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC;
  `;
  const { rows } = await db.query(query);
  return rows;
}

export async function getPostByIdQuery(id) {
  const query = `
    SELECT posts.*, users.username 
    FROM posts 
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = $1;
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

export async function createPostQuery(userId, title, content, community) {
  const query = `
    INSERT INTO posts (user_id, title, content, community)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const { rows } = await db.query(query, [userId, title, content, community]);
  return rows[0];
}
