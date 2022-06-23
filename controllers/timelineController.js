import loadMetaDatas from "../repositories/metadataRepository.js";
import { createPost, getPosts, putPost } from "../repositories/timelineRepositories.js";
import { addPostHashtags } from "../repositories/tagsRepositories.js";
import { findPostId } from "../repositories/postRepository.js";

export async function publishPost(req, res){
    const {url, text} = req.body;
    const { userId } = res.locals;
    const { hashtags } = res.locals;

    try{
        await createPost(url, text, userId);
        if(hashtags){
            for(let i = 0; i < hashtags.length; i++){
                let hashtagId = hashtags[i];
                const postsUserList = await findPostId(userId);
                let postId = postsUserList.rows[0].id; 
                await addPostHashtags(postId, hashtagId);
            }
        }
        res.sendStatus(201);
    } catch (error){
        return res.sendStatus(500);
    };
};

export async function getTimeline(req, res){
    const page = req.params.page || 0;
    try{
        const result = await getPosts(page);
        for(let i=0; i<result.rows.length;i++){
            const infos = await loadMetaDatas(result.rows[i]);
            result.rows[i] = {...result.rows[i], ...infos}
        }
        res.status(200).send(result.rows);
    } catch (error){
        console.log(error);
        return res.sendStatus(500);
    };
};

export async function editPost(req, res){
    const { text } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals;
    const { hashtags } = res.locals;

    try{
        await putPost(text, postId, userId);
        if(hashtags){
            for(let i = 0; i < hashtags.length; i++){
                let hashtagId = hashtags[i];
                await addPostHashtags(postId, hashtagId);
            }
        }
        res.sendStatus(200);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
