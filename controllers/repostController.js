import { getAllReposts, registerRepost, removeRepost } from "../repositories/repostRepository.js";


export async function postRepost(req, res){
    const { postId } = req.params;
    const { userId } = res.locals;
    try{
        await registerRepost(postId, userId);
        res.sendStatus(201);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
};

export async function deleteRepost(req, res){
    const { postId } = req.params;
    const { userId } = res.locals;
    try{
        await removeRepost(postId, userId);
        res.sendStatus(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
};

export async function getReposts(req, res){
    const { postId } = req.params;

    try{
        const allReposts = await getAllReposts(postId);
        res.send(allReposts.rows);
        
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
