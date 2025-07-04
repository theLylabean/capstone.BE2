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

router.get("/:id", async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(isNaN(id) || id < 0){
            return res.status(400).send({error: "Please provide a valid event"});
        }

        const event = await getEventById(id);
        if(!event){
            return res.status(404).send({error: "Event does not exist"});
        }

        res.send(event);
    }catch(err){
        console.error("Error fetching event by ID:", err);
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try{
        const {username, body, user_id} = req.body;
        if(!username || !body || !user_id){
            return res.status(400).send({error: "Missing required fields"});
        }

        const event = await createEvent({username, body, user_id});
        return res.status(201).send(event);

    }catch(err){
        console.error("Error creating event:", err);
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id < 0){
            return res.status(400).send({error: "Please provide a valid ID"});
        }

        const {username, body, user_id} = req.body;
        if(!username || !body || !user_id){
            return res.status(400).send({error: "Missing required fields"});
        }

        const event = await getEventById(id);
        if(!event){
            return res.status(404).send({error: "Event does not exist"});
        }

        const updated = await updateEvent({id, username, body, user_id});
        res.status(200).send(updated);

    }catch(err){
        console.error("Error updating event:", err);
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id < 0){
            return res.status(400).send({error: "Please provide a vaild event"});
        }

        const event = await getEventById(id);
        if(!event){
            return res.status(404).send({error: "Event not found"});
        }

        await deleteEvent(id);
        return res.sendStatus(204);

    }catch(err){
        console.error("Error deleting event:", err);
        next(err);
    }
})