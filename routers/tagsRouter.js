import { Router } from "express";
import { getTrending, getTagPosts } from "../controllers/tagsController.js";
import { validateToken } from "../middlewares/validateToken.js";

const tagsRouter = Router();

tagsRouter.get("/trending", validateToken, getTrending);
tagsRouter.get("/hashtag/:hashtag", validateToken, getTagPosts);

export default tagsRouter;