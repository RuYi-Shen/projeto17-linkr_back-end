import { insertFollow, deleteFollow, checkFollowByIds } from "./../repositories/followsRepository.js";

export async function follow(req, res){
    const followerId = res.locals.userId;
    const { followedId } = req.body;
    try{
        await insertFollow(followerId, followedId);
        res.sendStatus(200);
    } catch (e){
        res.send("Erro ao conectar ao banco de dados")
    }
};

export async function unfollow (req,res){
    const followerId = res.locals.userId;
    const { followedId } = req.body;
    try{
        await deleteFollow(followerId, followedId);
        res.sendStatus(200);
    } catch (e){
        res.send("Erro ao conectar ao banco de dados")
    }
};

export async function checkFollow(req, res){
    const followerId = res.locals.userId;
    const { followedId } = req.body;
    try{
        let result = await checkFollowByIds(followerId, followedId)
        if(result.rowCount === 0){
            return res.send(false)
        }
        return res.send(true)
    }catch(e){
        res.send(e)
    }
}