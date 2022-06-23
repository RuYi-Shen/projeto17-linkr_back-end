import { postComment, getPostComments, deleteComment, totalComments } from "../repositories/postRepository.js";

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
    const { id } = req.params;
    try{
        await deleteComment(id);
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

export async function countComments (req, res){
    const { postId } = req.params;
    try{
        const result = await totalComments(postId);
        res.status(200).send(result.rows[0].count);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};