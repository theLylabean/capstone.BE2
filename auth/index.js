import express from 'express';
import loginRouter from './login.js';
import registerRouter from './register.js';
import logoutRouter from './logout.js';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/logout', logoutRouter);

export default router;