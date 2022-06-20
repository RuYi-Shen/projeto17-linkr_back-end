import express from "express";
import { getTimeline, publishPost } from "../controllers/timelineController.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import urlSchema from "../schemas/urlSchema.js";


const timelineRouter = express.Router();

timelineRouter.post("/post", validateToken, validateSchema(urlSchema), publishPost);
timelineRouter.put("/post/:postId", validateToken, publishPost);
timelineRouter.get("/posts", validateToken, getTimeline);

export default timelineRouter; 