import { tagRepository } from "../repositories/tagsRepositories.js";
import { getUserPicById, searchUsersLike } from "../repositories/userRepositories.js";

export async function getUserPosts(req, res) {
  const { id } = req.params;
  try {
    const result = await tagRepository.getPosts(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
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
  const {search} = req.body;
  console.log(search)
  try {
    const result = await searchUsersLike(search)
    res.send(result.rows)
  }catch (e){
    res.status(500).send("Erro de conexão com servidor");
  }
}