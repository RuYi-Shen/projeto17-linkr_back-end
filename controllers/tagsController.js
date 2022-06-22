import { getPosts, getTrendings } from "../repositories/tagsRepositories.js";
import loadMetaDatas from "../repositories/metadataRepository.js";

export async function getTagPosts(req, res) {
  const { hashtag } = req.params;
  try {
    const result = await getPosts(hashtag);
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
}

export async function getTrending(req, res) {
  try {
    const { rows: trendingHashtags } = await getTrendings();

    res.send(trendingHashtags);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
