import express from "express";
import postsController from "../controllers/postsController.js";
import authMiddleware from "../authMiddleware/auth.js";
const router = express.Router();

router.get("/posts",authMiddleware,postsController.getPosts);

export default router;