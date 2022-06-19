import connection from "../config/database";

async function getPosts(id) {
  return connection.query(
    `
  SELECT posts.id, url, username, "likesCount", "userId", text, "pictureURL"
  FROM posts
  JOIN users
  ON posts."userId" = users.id
  WHERE users.id = $1`,
    [id]
  );
}

export const usersRepository = {
    getPosts
  };