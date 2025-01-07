import express from 'express';
import { followUser, unfollowUser, getFollowers, getFollowing } from '../controllers/followerController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Follow a user
router.post('/', authenticate, followUser);

// Unfollow a user
router.delete('/', authenticate, unfollowUser);

// Get followers of a user
router.get('/:userId/followers', authenticate, getFollowers);

// Get following users of a user
router.get('/:userId/following', authenticate, getFollowing);

export default router;
