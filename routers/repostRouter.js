import { Router } from "express";
import { deleteRepost, getReposts, postRepost } from "../controllers/repostController.js";

import { validateToken } from "../middlewares/validateToken.js";


const repostRouter = Router();

repostRouter.post("/repost/:postId", validateToken, postRepost);
repostRouter.delete("/repost/:postId", validateToken, deleteRepost);
repostRouter.get("/reposts/:postId",  getReposts);



export default repostRouter; 