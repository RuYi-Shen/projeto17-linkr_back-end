import { getUserByEmail, createUser } from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function signUp(req, res){
    const {username, email, password, pictureURL} = req.body;
    try{
        const existingUsers = await getUserByEmail(email)
        if (existingUsers.rows.length > 0) {
            return res.sendStatus(409);
        }
        await createUser(username, email, password, pictureURL);
        res.sendStatus(201);
    } catch (error){
        return res.sendStatus(500);
    };
};

export async function signIn (req, res){
    const { email, password } = req.body;
    const { rows: users } = await getUserByEmail(email);
    const [user] = users;
    if (!user) {
        return res.sendStatus(401); 
    }
    if (bcrypt.compareSync(password, user.password)) {
        const key = process.env.TOKEN_KEY;
        const token = jwt.sign(user.id, key);
        return res.send({token, userId:user.id});
    }
    res.sendStatus(401);
};