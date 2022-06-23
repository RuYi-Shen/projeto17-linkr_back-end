import express from "express";

const followsRouters = express.Router();

import {validateToken} from "./../middlewares/validateToken.js";
import {follow, unfollow} from "./../controllers/followsControllers.js";

followsRouters.post("/follow", validateToken, follow);
followsRouters.post("/unfollow", validateToken, unfollow);

export default followsRouters; 