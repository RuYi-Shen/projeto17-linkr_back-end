import { registerLike, removeLike } from "../repositories/postRepository.js";


export async function likePost(req, res){
    const { postId } = req.params;
    const { userId } = res.locals;
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
    const { userId } = res.locals;
    try{
        await removeLike(postId, userId);
        res.sendStatus(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
};

export async function returnLikes(req, res){
    const { postId } = req.params;
    const { userId } = res.locals;
    try{
        const { userLiked, allLikes } = await getLikes(postId, userId);
        const likes = await countLikes(postId);
        if (userLiked.rows.length === 0) {
            res.json({ likes: allLikes.rows });
        }
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }

}
