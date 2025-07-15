import express from "express";
import {
  getCommentsPost,
  addComment,
} from "../controllers/commentsController.js";
import { verifyToken } from "../auth/middleware/verifyToken.js";

const router = express.Router();

router.get("/:id/comments", getCommentsPost);
router.post("/:id/comments", verifyToken, addComment);

export default router;
