import express from "express";

import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUp, signIn } from "./../controllers/authControllers.js";

const authRouters = express.Router();

authRouters.post("/signup", validateSchema(signUpSchema), signUp);
authRouters.post("/signin", validateSchema(signInSchema), signIn);

export default authRouters; 