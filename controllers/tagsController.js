import connection from "../config/database";

export async function getTagPosts(req, res) {
  const { hashtag } = req.params;
  try {
    const result = await connection.query(
      `
    SELECT *
    FROM posts
    JOIN posts_tags
    ON posts.id = posts_tags."postId"
    JOIN hashtags
    ON posts_tags."tagsId" = hashtags.id
    WHERE hashtags.tag = $1`,
      [hashtag]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com servidor");
  }
}
