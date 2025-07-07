import express from "express";
import {
  getAllPosts,
  getPostbyId,
  createPosts,
} from "../controllers/postsController.js";
import { verifyToken } from "../auth/middleware/verifyToken.js";
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostbyId);
router.post("/", verifyToken, createPosts);

export default router;
