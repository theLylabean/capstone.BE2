import express from 'express';
import verifyToken from '../auth/middleware/verifyToken.js';
import { followUser, getFollowers, getFollowing, getFollowStatus, unfollowUser } from '../db/queries/followsQueries.js';
const router = express.Router();

router.post('/:id/follow', verifyToken, async ( req, res, next ) => {
    const followingUserId = req.user.id;
    const followedUserId = parseInt(req.params.id);

    if (!followingUserId || isNaN(followedUserId)) {
        return res.status(400).json({ error: 'Missing or invalid user ID.' });
    }

    if (followingUserId === followedUserId) {
        return res.status(400).json({ error: 'You cannot follow yourself.' });
    }
     try {
        await followUser(followingUserId, followedUserId);
        res.status(200).json({ message: 'Followed successfully.' });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to follow user.' });
     }
});

router.delete('/:id/unfollow', verifyToken, async ( req, res, next ) => {
    const followingUserId = req.user.id;
    const followedUserId = parseInt(req.params.id);

    if (!followingUserId || isNaN(followedUserId)) {
        return res.status(400).json({ error: 'Missing or invalid user ID.' });
    }

    if (followingUserId === followedUserId) {
        return res.status(400).json({ error: 'You cannot follow yourself.' });
    }
    try {
        await unfollowUser(followingUserId, followedUserId);
        res.status(200).json({ message: 'Unfollowed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to unfollow user.' });
    }
})

router.get('/:id/following', verifyToken, async ( req, res, next ) => {
    const followingUserId = req.user.id;
    if (!followingUserId) {
        return res.status(400).json({ error: 'Missing or invalid followingUserId' })
    }
    try {
        const followingList = await getFollowing(followingUserId);
        res.status(200).json(followingList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve following list.' });
    }
})

router.get('/:id/followers', verifyToken, async ( req, res, next ) => {
    const followedUserId = req.params.id;
    if (!followedUserId) {
        return res.status(400).json({ error: 'Missing or invalid followedUserId' });
    }
    try {
        const followerList = await getFollowers(followedUserId);
        res.status(200).json(followerList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve followed list.' });
    }
})

router.get('/:targetUserId/status', verifyToken, async ( req, res, next ) => {
    const currentUserId = req.user.id;
    const targetUserId = parseInt(req.params.targetUserId);
    if (currentUserId === targetUserId) {
        return res.status(400).json({ message: 'You cannot follow yourself.' })
    }
    try {
        const isFollowing = await getFollowStatus(currentUserId, targetUserId);
        res.json({ isFollowing });
    } catch (error) {
        console.error('Error checking follows status: ', error);
        res.status(500).json({ error: 'Failed to check follow status.' });
    }
});

export default router;