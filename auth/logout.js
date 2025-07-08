import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).json({ message: "Successfully logged out" });
});

export default router;
