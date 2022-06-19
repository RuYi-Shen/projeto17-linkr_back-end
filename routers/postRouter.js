import { Router } from "express";

import { validateToken } from "../middlewares/validateToken.js";
import { likePost, dislikePost, returnLikes, deletePost } from "../controllers/postController.js";


const postRouter = Router();

postRouter.post("/like/:postId", validateToken, likePost);
postRouter.post("/dislike/:postId", validateToken, dislikePost);
postRouter.get("/likes/:postId", validateToken, returnLikes);
postRouter.delete("/posts/:postId", validateToken, deletePost);

export default postRouter; 