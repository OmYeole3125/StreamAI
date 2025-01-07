import express from "express";
import {
  createSubscription,
  getUserSubscriptions,
  getStreamerSubscriptions,
  unsubscribe,
} from "../controllers/subscriptionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Subscribe to a streamer
router.post("/subscribe", authenticate, createSubscription);

// Get all subscriptions of a user
router.get("/user", authenticate, getUserSubscriptions);

// Get all subscribers of a streamer
router.get("/streamer", authenticate, getStreamerSubscriptions);

// Unsubscribe from a streamer
router.delete("/unsubscribe", authenticate, unsubscribe);

export default router;
