import { Router } from "express";

import {validateToken} from "../middlewares/validateToken.js";
import {likePost,dislikePost,returnLikes} from "../controllers/postController.js";


const postRouter = Router();

postRouter.post("/like/:postId", validateToken, likePost);
postRouter.post("/dislike/:postId", validateToken, dislikePost);
postRouter.get("/likes/:postId", validateToken, returnLikes);

export default postRouter; 