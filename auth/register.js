import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { createUsers, newEmailCheck, newUsernameCheck } from '../db/queries/usersQueries.js';
const router = express.Router();
const SECRET = process.env.JWT_SECRET;

router.post('/', async( req, res, next ) => {
    try {
        const { first_name, last_name, email, username, password } = req.body;
        if ( !username || !password ) {
            return res.status(400).json({ message: 'Username and password required' });
        }
        const existingUsername = await newUsernameCheck(username);
        const existingEmail = await newEmailCheck(email);
        if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists.' });
        }
        if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUsers(first_name, last_name, email, username, hashedPassword);
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username }, SECRET 
        );
        res.status(201).json({
            token,
            user:
            { id: newUser.id, username: newUser.username, email: newUser.email }
        })
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ message: 'Failed to register new User' });
    }
});

export default router;