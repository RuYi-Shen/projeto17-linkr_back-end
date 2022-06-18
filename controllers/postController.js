import { registerLike } from "../repositories/postRepositories.js";


export async function likePost(req, res){
    const { postId } = req.params;
    const { userId } = req.locals;
    try{
        await registerLike(postId, userId);
        res.sendStatus(201);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
};

export async function dislikePost(req, res){
    const { postId } = req.params;
    const { userId } = req.locals;
    try{
        await removeLike(postId, userId);
        res.sendStatus(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
};