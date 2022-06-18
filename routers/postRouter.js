import { Router } from "express";

import {validateToken} from "../middlewares/validateToken.js";
import {likePost,dislikePost} from "../controllers/postController.js";


const postRouter = Router();

postRouter.post("/like/:postId", validateToken, likePost);
postRouter.post("/dislike/:postId", validateToken, dislikePost);

export default postRouter; 