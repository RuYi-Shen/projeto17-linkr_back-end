import { getPosts, getUserCommentById } from "../repositories/usersRepositories.js";
import { getUserPicById, searchUsersLike } from "../repositories/userRepositories.js";
import loadMetaDatas from "../repositories/metadataRepository.js";

export async function getUserPosts(req, res) {
  const { id } = req.params;
  try {
    const result = await getPosts(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    for(let i=0; i<result.rows.length;i++){
      const infos = await loadMetaDatas(result.rows[i]);
      result.rows[i] = {...result.rows[i], ...infos}
  }
    res.status(200).send(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
};

export async function getUserPic(req, res){
  const id = res.locals.userId;
  try{
    const result = await getUserPicById(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows[0]);
  } catch (e){
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
};

export async function searchUsers(req, res){
  const id = res.locals.userId;
  const {search} = req.body;
  console.log(search)
  try {
    const result = await searchUsersLike(id, search)
    res.send(result.rows)
  }catch (e){
    res.status(500).send("Erro de conexão com servidor");
  }
}

export async function getUserComment(req, res){
  const { id } = req.params;
  try{
    const result = await getUserCommentById(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows);
  } catch (e){
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
};