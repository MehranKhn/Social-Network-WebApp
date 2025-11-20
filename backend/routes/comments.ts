import express from "express";
import commentsController from "../controllers/commentsController.js";
import authMiddleware from "../authMiddleware/auth.js";

const router = express.Router();

router.post("/postComment",authMiddleware,commentsController.postComment);
router.get("/getComments/:id",authMiddleware,commentsController.getComment);

export default router;