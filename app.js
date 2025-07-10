import express from "express";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import authRouter from './auth/index.js';
import eventsRouter from './api/events.js';
import resourcesRouter from './api/resources.js';
import followRouter from './api/follows.js'
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
export default app;


app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use(cors());

app.use("/auth", authRouter);
app.use('/api/follows', followRouter);
app.use("/api/posts", postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/resources', resourcesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Sorry! Something went wrong.');
});
