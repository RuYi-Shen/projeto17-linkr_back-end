import { getPosts, getTrendings } from "../repositories/tagsRepositories.js";

export async function getTagPosts(req, res) {
  const { hashtag } = req.params;
  try {
    const result = await getPosts(hashtag);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
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
