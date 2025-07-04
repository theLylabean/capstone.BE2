import db from "../client.js";

export async function getResources(){
    try{
        const { rows } = await db.query(
            `SELECT * FROM resources`
        );
        return rows;
    } catch (err) {
        console.error('Error fetching resources:', err);
        throw err;
    }
}

export async function getResourceById(id){
    const sql = `
        SELECT *
        FROM resources
        WHERE id = $1
    `;

    try{
        const { rows }=  await db.query(sql, [id]);
        return rows[0];
    } catch (err) {
        console.error('Resource not found:', err);
        throw err;
    }
}

export async function createResource({title, body, user_id}){
    const sql = `
        INSERT INTO resources (title, body, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    try{
        const { rows } = await db.query(sql, [title, body, user_id]);
        return rows[0];
    } catch (err) {
        console.error('Error creating resource:', err);
        throw err;
    }
}

export async function updateResource({id, title, body, user_id}){
    const sql = `
        UPDATE resources
        SET title = $1, body = $2, user_id = $3
        WHERE id = $4
        RETURNING *
    `;

    try{
        const { rows } = await db.query(sql, [title, body, user_id, id]);
        return rows[0];
    } catch (err) {
        console.error('Error updating resource:', err);
        throw err;
    }
}

export async function deleteResource(id){
    const sql = `
        DELETE FROM resources
        WHERE id = $1
        RETURNING *
    `;

    try{
        const { rows } = await db.query(sql, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error deleting resource:', err);
        throw err;
    }
}