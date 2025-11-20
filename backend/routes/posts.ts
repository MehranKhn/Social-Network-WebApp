import express from "express";
import postsController from "../controllers/postsController.js";
import authMiddleware from "../authMiddleware/auth.js";
import upload from "../multer/multer.js";

const router = express.Router();

router.get("/getPosts",authMiddleware,postsController.getPosts);
router.get("/getProfilePosts/:id",authMiddleware,postsController.getPostsOfUser);
router.post("/addPost",authMiddleware,upload.single('file'),postsController.addPost);
router.post("/deletePost",authMiddleware,postsController.deletePost);

export default router;