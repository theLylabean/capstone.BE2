import db from '../client.js';
import { createEvent } from '../queries/events.js';
import { createResource } from '../queries/resources.js';

export async function seedEvents() {
    try {
        await createEvent({username: "itsnancyq", body: "Craft and Connect: Join us virtually on July 24, 2025 at 7pm(CST) to celebrate our wins and creating fun crafts! More details to come!", user_id: 1});
    } catch (error) {
        console.error('❌ Error creating event:', error)
    }
}

export async function seedResources() {
    try {
        await createResource({title: "988 Suicide and Crisis Lifeline", body: "Help is available 24/7. Dial 988.", user_id: 1});
    } catch (error) {
        console.error("❌ Error creating resource:", error)
    }
}

console.log("🌱 Events & Resources seeded.");