import { getUserByEmail, createUser } from "../repositories/userRepositories.js";

export async function signUp(req, res){
    const {username, email, password, pictureURL} = req.body;
    try{
        const existingUsers = getUserByEmail(email)
        if (existingUsers.rowCount > 0) {
            return res.sendStatus(409);
        }
        await createUser(username, email, password, pictureURL);
        res.sendStatus(201);
    } catch (error){
        return res.sendStatus(500);
    };
};

export async function signIn (req, res){

};

export async function signOut (req, res){

};