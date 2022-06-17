import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRouters from "./routers/authRouters.js";
import tagsRouter from "./routers/tagsRouter.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouters);
app.use(tagsRouter);
app.use(usersRouter);

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});