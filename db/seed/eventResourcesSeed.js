import db from "#db/client";

await db.connect();
await seedEvents();
await seedResources();
await db.end();
console.log("🌱 Database seeded.");

async function seedEvents() {
    await createEvent({username: "itsnancyq", body: "Craft and Connect: Join us virtually on July 24, 2025 at 7pm(CST) to celebrate our wins and creating fun crafts! More details to come!", user_id: 1})
}

async function seedResources() {
    await createResource({title: "988 Suicide and Crisis Lifeline", body: "Help is available 24/7. Dial 988.", user_id: 1})
}