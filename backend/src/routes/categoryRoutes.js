import express from "express";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { adminValidation } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Create category (Admin only)
router.post("/create", authenticate, adminValidation, createCategory);

// Get all categories
router.get("/", authenticate, getCategories);

// Get category by ID
router.get("/:id", authenticate, getCategoryById);

// Update category (Admin only)
router.put("/:id", authenticate, adminValidation, updateCategory);

// Delete category (Admin only)
router.delete("/:id", authenticate, adminValidation, deleteCategory);

export default router;
