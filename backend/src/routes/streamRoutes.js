import express from "express";
import { createStream } from "../controllers/streamController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new stream
router.post("/create", authenticate, createStream);

export default router;
