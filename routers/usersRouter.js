import { Router } from "express";
import { getUserPosts, getUserPic, searchUsers } from "../controllers/usersController.js";
import { validateToken } from "../middlewares/validateToken.js";

const usersRouter = Router();

usersRouter.get("/user/:id", validateToken, getUserPosts);
usersRouter.get("/userpic", validateToken, getUserPic);
usersRouter.get("/search-user", validateToken, searchUsers);

export default usersRouter;