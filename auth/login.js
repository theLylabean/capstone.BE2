import express from 'express';
import { getLogin } from '../db/queries/usersQueries';
const router = express.Router();

router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (!username || !password ) {
            return res.status(400).json({ message: 'Username and password required.' });
        }
        const userLogin = getLogin();
        const user = userLogin.rows[0];
        if ( !user ) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPWMatch = bcrypt.compare(password, user.password);
        if ( !isPWMatch ) {
            return res.status(401).json({ message: 'Incorrect password. Please try again.' })
        }
        const token = jwt.sign(
            { id: user.id, username: user.username }, SECRET
        );
        res.json({
            token,
            user:
            { id: user.id, username: user.username }
        });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Unable to login user. Please try again.'})
    }
});

export default router;