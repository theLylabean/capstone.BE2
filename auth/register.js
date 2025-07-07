import express from 'express';
import { createUsers, newEmailCheck, newUsernameCheck } from '../db/queries/usersQueries';
const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post('/', newUsernameCheck, newEmailCheck, async( req, res, next ) => {
    try {
        const { first_name, last_name, email, username, password } = req.body;
        if ( !username || !password ) {
            return res.status(400).json({ message: 'Username and password required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUsers(first_name, last_name, email, username, hashedPassword);
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username }, SECRET 
        );
        res.status(201).json({
            token,
            user:
            { id: newUser.id, username: newUser.username }
        })
    } catch (error) {
        next(error);
    }
});

export default router;