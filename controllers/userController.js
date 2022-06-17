import connection from "../config/database";

export async function getUserPosts(req, res) {
  const { id } = req.params;
  try {
    const result = await connection.query(
      `
    SELECT *
    FROM posts
    JOIN users
    ON posts."userId" = users.id
    WHERE users.id = $1`,
      [id]
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