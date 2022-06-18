import { Router } from "express";

import {validateToken} from "../middlewares/authMiddleware.js";
import {likePost,dislikePost} from "../controllers/postController.js";


const postRouters = Router();

postRouters.post("/like/:postId", validateToken, likePost);
postRouters.post("/dislike/:postId", validateToken, dislikePost);

export default postRouters; 