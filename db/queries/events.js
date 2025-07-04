import db from "../client.js";

export async function getEvents(){
    try {
        const { rows } = await db.query(
            `SELECT * FROM events`
        );
        return rows;
    } catch (err) {
        console.error('Error fetching events:', err);
        throw err;
    }
}

export async function getEventById(id){
    const sql = `
    SELECT *
    FROM events
    WHERE id = $1
    `;

    try {
        const { rows } = await db.query(sql, [id]);
        return rows[0];
    } catch (err) {
        console.error('Event not found:', err);
        throw err;
    }
}

export async function createEvent({username, body, user_id}){
    const sql = `
    INSERT INTO events (username, body, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;

    try{
        const { rows } = await db.query(sql, [username, body, user_id]);
        return rows[0];
    } catch (err) {
        console.error('Error creating event:', err);
        throw err;
    }
}

export async function updateEvent({id, username, body, user_id}){
    const sql = `
        UPDATE events
        SET username = $1, body = $2, user_id = $3
        WHERE id = $4
        RETURNING *
    `;

    try{
        const { rows } = await db.query(sql, [username, body, user_id, id]);
        return rows[0];
    } catch (err) {
        console.error('Error updating event:', err);
        throw err;
    }
}

export async function deleteEvent(id){
    const sql = `
        DELETE FROM events
        WHERE id = $1
        RETURNING *
    `;

    try{
        const { rows } = await db.query(sql, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error deleting event:', err);
        throw err;
    }
}