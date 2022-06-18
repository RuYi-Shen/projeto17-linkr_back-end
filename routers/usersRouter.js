import { Router } from "express";
import { getUserPosts } from "../controllers/usersController.js";
import { validateToken } from "../middlewares/validateToken.js";

const usersRouter = Router();

usersRouter.get("/user/:id", validateToken, getUserPosts);

export default usersRouter;