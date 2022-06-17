import { createPost } from "../repositories/timelineRepositories.js";


export async function publishPost(req, res){
    const {url, text} = req.body;
    const { userId } = res.locals;

    try{
        await createPost(url, text, userId);
        res.sendStatus(201);
    } catch (error){
        return res.sendStatus(500);
    };
};