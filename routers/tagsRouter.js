import { Router } from "express";
import { getTagPosts } from "../controllers/tagsController";

const tagsRouter = Router();

tagsRouter.get("/hashtag/:hashtag", getTagPosts);

export default tagsRouter;