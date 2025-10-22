import express from 'express';
import { addLike, removeLike, getLikesByStream } from '../controllers/likesController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a like
router.post('/', authenticate, addLike);

// Remove a like
router.delete('/:id', authenticate, removeLike);

// Get all likes for a specific stream
router.get('/:streamId', getLikesByStream);

export default router;
