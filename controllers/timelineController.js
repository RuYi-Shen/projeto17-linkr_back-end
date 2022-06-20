import loadMetaDatas from "../repositories/metadataRepository.js";
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
        for(let i=0; i<result.rows.length;i++){
            const infos = await loadMetaDatas(result.rows[i]);
            result.rows[i] = {...result.rows[i], ...infos}
        }
        
        res.status(200).send(result.rows);
    } catch (error){
        return res.sendStatus(500);
    };
};