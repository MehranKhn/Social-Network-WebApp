import express from "express";
import likesController from "../controllers/likesController.js";
import authMiddleware from "../authMiddleware/auth.js";
const router = express.Router();

router.post("/addLike",authMiddleware,likesController.like);
router.post("/removeLike",authMiddleware,likesController.removeLike);
router.get("/getLike/:postId",authMiddleware,likesController.getLikesCount);
router.get("/userLikes/:userId",authMiddleware,likesController.postLikedByUser);

export default router;