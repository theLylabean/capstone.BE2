import db from '../../db/client.js'

export async function commentSeed() {
  try {
    console.log("Seeding Comment...");
    const insertQuery = `
    INSERT INTO comments (post_id, user_id, content)
    VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12) RETURNING *`;

    const value = [
      1,
      2,
      "Great idea! I have some tips to share too.",
      1,
      3,
      "Excited to join this discussion.",
      2,
      1,
      "I love staying up to date with tech news!",
      3,
      2,
      "Gardening brings people together. Love it!",
    ];

    const { rows } = await db.query(insertQuery, value);
    console.log("Insert comments:", rows);
  } catch (error) {
    console.log("Error Seeding comments!!");
  }
}

commentSeed();
