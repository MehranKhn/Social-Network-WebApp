import express from "express";
import storyController from "../controllers/storyController.js";
import auth from "../authMiddleware/auth.js"
import upload from "../multer/multer.js";
const router = express.Router();

router.get('/get-stories',auth,storyController.getStories);
router.post('/upload-story',auth,upload.array('files'),storyController.postStory
);
router.get('/my-stories',auth,storyController.myStory
);

export default router;