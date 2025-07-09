import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

import { usersSeed } from "./usersSeed.js";
import { seedResources, seedEvents } from "./eventResourcesSeed.js";
import { seedPosts } from "./postsSeed.js";
import { commentSeed } from "./commentSeed.js";
import db from "../client.js";

async function runSeeds() {
  try {
    await usersSeed();
    await seedResources();
    await seedEvents();
    await seedPosts();
    await commentSeed();

    console.log("🌱 All seed data inserted successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await db.end();
  }
}

runSeeds();
