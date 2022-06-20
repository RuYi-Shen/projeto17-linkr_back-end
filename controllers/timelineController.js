import { createPost, getPosts } from "../repositories/timelineRepositories.js";


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

export async function getTimeline(req, res){
    
    try{
        const result = await getPosts();
        res.status(200).send(result.rows);
    } catch (error){
        return res.sendStatus(500);
    };
};