import express from "express";
import { getTimeline, publishPost, editPost } from "../controllers/timelineController.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { addHashtags } from "../middlewares/getHashtags.js";
import urlSchema from "../schemas/urlSchema.js";


const timelineRouter = express.Router();

timelineRouter.post("/post", validateToken, validateSchema(urlSchema), addHashtags, publishPost);
timelineRouter.put("/post/:postId", validateToken, addHashtags, editPost);
timelineRouter.get("/posts", validateToken, getTimeline);

export default timelineRouter; 