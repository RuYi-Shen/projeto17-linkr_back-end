import { getUserByEmail, createUser } from "../repositories/userRepositories.js";

export async function signUp(req, res){
    const user = req.body;
    try{
        const existingUsers = usersRepository.getUserByEmail(user.email)
        if (existingUsers.rowCount > 0) {
            return res.sendStatus(409);
        }
        const {name, email, password, pictureURL} = user;
        await usersRepository.createUser(name, email, password, pictureURL);
        res.sendStatus(201);
    } catch (error){
        return res.sendStatus(500);
    };
};

export async function signIn (req, res){

};

export async function signOut (req, res){

};