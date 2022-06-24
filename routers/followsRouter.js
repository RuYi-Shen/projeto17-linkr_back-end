import express from "express";

const followsRouters = express.Router();

import {validateToken} from "./../middlewares/validateToken.js";
import {follow, unfollow, checkFollow, checkFollowings} from "./../controllers/followsControllers.js";

followsRouters.post("/follow", validateToken, follow);
followsRouters.post("/unfollow", validateToken, unfollow);
followsRouters.post("/checkfollow", validateToken, checkFollow);
followsRouters.get("/following", validateToken, checkFollowings)

export default followsRouters; 