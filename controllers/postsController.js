import {
  getAllPostsQuery,
  getPostByIdQuery,
  createPostQuery,
} from "../db/queries/postsQueries.js";

export async function getAllPosts(req, res) {
  try {
    const posts = await getAllPostsQuery();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function getPostbyId(req, res) {
  try {
    const post = await getPostByIdQuery(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function createPosts(req, res) {
  try {
    const userId = req.params.id;
    const { title, content, community } = req.body;
    if (!title || !content || !community) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newPost = await createPostQuery(userId, title, content, community);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Server Error!" });
  }
}
