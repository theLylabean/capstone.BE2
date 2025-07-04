import express from "express";
const router = express.Router();
export default router;

import {getEvents, getEventById, createEvent, updateEvent, deleteEvent} from '../db/queries/events.js';

router.get("/", async (req, res, next) => {
    try{
        const events = await getEvents();
        return res.send(events);
        // return res.json(events):
    }catch(err){
        console.error("Could not fetch events:", err);
        next(err);
    }
});