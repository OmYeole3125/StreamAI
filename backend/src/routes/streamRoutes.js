import express from 'express';
import { createStream, getAllStreams, getStreamById, updateStream, deleteStream } from '../controllers/streamController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create Stream
router.post('/create', authenticate, createStream);

// Get All Streams
router.get('/', getAllStreams);

// Get Stream by ID
router.get('/:id', getStreamById);

// Update Stream
router.put('/:id', authenticate, updateStream);

// Delete Stream
router.delete('/:id', authenticate, deleteStream);

export default router;
