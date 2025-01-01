import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js"; // Ensure user is authenticated
import { generateStreamKey } from "../controllers/streamkeyController.js";

const router = express.Router();

// Route to generate a stream key
router.post("/generate", authenticate , generateStreamKey);

export default router;
