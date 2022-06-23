import express from "express";

const followsRouters = express.Router();

import {validateToken} from "./../middlewares/validateToken.js";
import {follow, unfollow, checkFollow} from "./../controllers/followsControllers.js";

followsRouters.post("/follow", validateToken, follow);
followsRouters.post("/unfollow", validateToken, unfollow);
followsRouters.post("/checkfollow", validateToken, checkFollow);

export default followsRouters; 