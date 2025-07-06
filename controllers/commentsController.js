import { getCommentsForPostQueries, addCommentQueries } from "../db/queries/commentsQueries.js";

export async function getCommentsPost(req, res) {
  try {
    const postId = req.params.id;
    const comments = await getCommentsForPostQueries(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function addComment(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;
    const comment = await addCommentQueries(postId, userId, content);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
