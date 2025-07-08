import express from 'express';
import verifyToken from './middleware/verifyToken';
import { deleteUser, getUserById, updateUser } from '../db/queries/usersQueries';
const router = express.Router;

router.get('/:id', verifyToken, async ( req, res, next ) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to get user by ID.' });
    }
})

router.put(':/id', verifyToken, async ( req, res, next ) => {
    try {
        const { username, password } = req.body;
        if ( !username || !password ) {
            return res.status(400).json({ message: 'Username and password required.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await updateUser(req.params.id, username, hashedPassword);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to update user.' });
    }
});

router.delete('/:id', verifyToken, async ( req, res, next ) => {
    try {
        const deletedUser = await deleteUser(req.params.id);
        if ( !deletedUser ) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
});

export default router;