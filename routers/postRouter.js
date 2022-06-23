import { Router } from "express";

import { validateToken } from "../middlewares/validateToken.js";
import { likePost, dislikePost, returnLikes, deletePost } from "../controllers/postController.js";
import { commentPost, getComments, removeComment, countComments } from "../controllers/commentsController.js";


const postRouter = Router();

postRouter.post("/like/:postId", validateToken, likePost);
postRouter.post("/dislike/:postId", validateToken, dislikePost);
postRouter.get("/likes/:postId", validateToken, returnLikes);
postRouter.delete("/posts/:postId", validateToken, deletePost);
postRouter.post("/comments/:postId", validateToken, commentPost);
postRouter.get("/comments/:postId", validateToken, getComments);
postRouter.delete("/comments/:id", validateToken, removeComment);
postRouter.get("/comments/count/:postId", validateToken, countComments);

export default postRouter; 