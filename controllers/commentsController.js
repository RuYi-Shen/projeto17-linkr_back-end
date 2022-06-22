import { postComment, getPostComments, deleteComment } from "../repositories/postRepository.js";

export async function commentPost(req, res){
    const { postId } = req.params;
    const { userId } = res.locals;
    const { text } = req.body;
    try{
        await postComment(text, postId, userId);
        res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};

export async function removeComment(req, res){
    const { postId } = req.params;
    const { userId } = res.locals;
    try{
        await deleteComment(postId, userId);
        res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};

export async function getComments (req, res){
    const { postId } = req.params;
    try{
        const result = await getPostComments(postId);
        res.status(200).send(result.rows);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};