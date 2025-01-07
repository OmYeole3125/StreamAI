import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js"; // Assuming you've already set up auth
import { saveChatMessage } from "../controllers/chatController.js";

const router = express.Router();

// Create a new chat message (not used directly in real-time, but can be used for testing)
router.post("/message", authenticate, async (req, res) => {
  const { stream_id, message } = req.body;
  const user_id = req.userId; // Assuming this is set from JWT auth

  if (!stream_id || !message) {
    return res.status(400).json({ message: "Stream ID and message are required" });
  }

  try {
    const chatMessage = await saveChatMessage(stream_id, user_id, message);
    return res.status(201).json(chatMessage);
  } catch (error) {
    return res.status(500).json({ message: "Failed to save message" });
  }
});

export default router;
