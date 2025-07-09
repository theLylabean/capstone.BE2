import db from "../../db/client.js";

export async function seedPosts() {
  try {
    console.log("Seeding Posts....");

    const insertQuery = `INSERT INTO posts (user_id, title, content, community)
        VALUES ($1, $2, $3, $4),($5, $6, $7, $8),($9, $10, $11, $12)  RETURNING *`;
    const values = [
      1,
      "Welcome to Health Talk",
      "Let’s share health tips and discuss wellness.",
      "Health",
      2,
      "Tech News Today",
      "Breaking news in the tech world!",
      "Technology",
      3,
      "Community Gardening Tips",
      "How to grow food with your neighbors.",
      "Gardening",
    ];

    const { rows } = await db.query(insertQuery, values);
    console.log("Seeded Posts:", rows);
  } catch (error) {
    console.log("Error Seeding Posts:", error);
  }
}

seedPosts();
