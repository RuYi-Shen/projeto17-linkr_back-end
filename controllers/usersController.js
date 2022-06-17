import { tagRepository } from "../repositories/tagsRepositories";

export async function getUserPosts(req, res) {
  const { id } = req.params;
  try {
    const result = await tagRepository.getPosts(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}