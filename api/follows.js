import express from 'express';
import verifyToken from '../auth/middleware/verifyToken.js';
import { followUser, getFollowers, getFollowing, unfollowUser } from '../db/queries/followsQueries.js';
const router = express.Router();

router.post('/:id/follow', verifyToken, async ( req, res, next ) => {
    const following_user_id = req.user.id;
    const followed_user_id = parseInt(req.params.id);

    if (!following_user_id || isNaN(followed_user_id)) {
        return res.status(400).json({ error: 'Missing or invalid user ID.' });
    }

    if (following_user_id === followed_user_id) {
        return res.status(400).json({ error: 'You cannot follow yourself.' });
    }
     try {
        await followUser(following_user_id, followed_user_id);
        res.status(200).json({ message: 'Followed successfully.' });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to follow user.' });
     }
});

router.delete('/:id/unfollow', verifyToken, async ( req, res, next ) => {
    const following_user_id = req.user.id;
    const followed_user_id = parseInt(req.params.id);

    if (!following_user_id || isNaN(followed_user_id)) {
        return res.status(400).json({ error: 'Missing or invalid user ID.' });
    }

    if (following_user_id === followed_user_id) {
        return res.status(400).json({ error: 'You cannot follow yourself.' });
    }
    try {
        await unfollowUser(following_user_id, followed_user_id);
        res.status(200).json({ message: 'Unfollowed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to unfollow user.' });
    }
})

router.get('/:id/following', verifyToken, async ( req, res, next ) => {
    const following_user_id = req.user.id;
    if (!following_user_id) {
        return res.status(400).json({ error: 'Missing or invalid following_user_id' })
    }
    try {
        await getFollowing(following_user_id);
        res.status(200).json({ message: 'Success retrieving following list.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve following list.' });
    }
})

router.get('/:id/followers', verifyToken, async ( req, res, next ) => {
    const followed_user_id = req.params.id;
    if (!followed_user_id) {
        return res.status(400).json({ error: 'Missing or invalid followed_user_id' });
    }
    try {
        await getFollowers(followed_user_id);
        res.status(200).json({ message: 'Success retrieving followers list.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve followed list.' });
    }
})
export default router;