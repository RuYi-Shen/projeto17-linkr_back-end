import connection from "../config/database.js";

export async function getPosts(id) {
  return connection.query(
    `
  SELECT posts.id, url, username, "userId", text, "pictureURL"
  FROM posts
  JOIN users
  ON posts."userId" = users.id
  WHERE users.id = $1
  ORDER BY posts."createdAt" DESC
  LIMIT 20`,
    [id]
  );
}

export async function getUserCommentById(id) {
  return connection.query(
    `
  SELECT users.username, users."pictureURL"
  FROM users
  WHERE users.id = $1`,
    [id]
  );
}