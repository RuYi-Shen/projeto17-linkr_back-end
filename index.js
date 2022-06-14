import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// import routers

const app = express();
app.use(cors());
app.use(express.json());

// app.use(xxxRouters);

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});