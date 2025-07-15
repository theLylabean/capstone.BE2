import express from "express";
const router = express.Router();
export default router;

import {getResources, getResourceById, createResource, updateResource, deleteResource} from '../db/queries/resources.js';
import verifyToken from "../auth/middleware/verifyToken.js";

router.get("/", async (req, res, next) => {
    try{
        const resource = await getResources();

        return res.send(resource);
        // return res.json(resource):
    }catch(err){
        console.error("Could not fetch resources:", err);
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(isNaN(id) || id < 0){
            return res.status(400).send({error: "Please provide a valid resource"});
        }

        const resource = await getResourceById(id);
        if(!resource){
            return res.status(404).send({error: "Resource does not exist"});
        }

        res.send(resource);
    }catch(err){
        console.error("Error fetching resource by ID:", err);
        next(err);
    }
});

router.post("/", verifyToken, async (req, res, next) => {
    try{
        const {title, body, user_id} = req.body;
        if(!title || !body || !user_id){
            return res.status(400).send({error: "Missing required fields"});
        }

        const resource = await createResource({title, body, user_id});
        return res.status(201).send(resource);

    }catch(err){
        console.error("Error creating resource:", err);
        next(err);
    }
});

router.put("/:id", verifyToken, async (req, res, next) => {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id < 0){
            return res.status(400).send({error: "Please provide a valid ID"});
        }

        const {title, body, user_id} = req.body;
        if(!title || !body || !user_id){
            return res.status(400).send({error: "Missing required fields"});
        }

        const resource = await getResourceById(id);
        if(!resource){
            return res.status(404).send({error: "Resource does not exist"});
        }

        const updated = await updateResource({id, title, body, user_id});
        res.status(200).send(updated);

    }catch(err){
        console.error("Error updating resource:", err);
        next(err);
    }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id < 0){
            return res.status(400).send({error: "Please provide a vaild resource"});
        }

        const resource = await getResourceById(id);
        if(!resource){
            return res.status(404).send({error: "Resource not found"});
        }

        await deleteResource(id);
        return res.sendStatus(204);

    }catch(err){
        console.error("Error deleting resource:", err);
        next(err);
    }
});