import db from '../client.js'

export async function getCommentsForPostQueries(postId) {
  const query = `
    SELECT comments.*, users.username 
    FROM comments 
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at ASC;
  `;
  const { rows } = await db.query(query, [postId]);
  return rows;
}

export async function addCommentQueries(postId, userId, content) {
  const query = `
    INSERT INTO comments (post_id, user_id, content)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await db.query(query, [postId, userId, content]);
  return rows[0];
}


