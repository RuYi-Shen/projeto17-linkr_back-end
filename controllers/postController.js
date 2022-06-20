import { registerLike, removeLike, getLikes, countLikes, removePost, removePostLikes } from "../repositories/postRepository.js";


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
    let liked = false;
    try{
        const { userLiked, allLikes } = await getLikes(postId, userId);
        const likes = await countLikes(postId);
        if (userLiked.rows.length > 0) {
            liked = true;
            allLikes.rows.unshift(userLiked.rows[0]);
        }
        res.json({ likesUsers: allLikes.rows, liked, likes });
        
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deletePost(req, res){
    const { postId } = req.params;
    const { userId } = res.locals;
    try{
        await removePostLikes(postId);
        await removePost(postId, userId);
        res.sendStatus(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
