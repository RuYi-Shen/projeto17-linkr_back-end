import connection from "../config/database.js";

export async function createPost(url, text, userId) {
  return connection.query(
    `
      INSERT INTO posts (url, text, "userId") 
      VALUES ($1, $2, $3)`,
    [url, text, userId]
  );
}

export async function getPosts(page, userId) {
  return connection.query(
    `
    SELECT posts.id, posts.url, posts."userId", posts.text, users.username, users."pictureURL", reposts."userId" as "repostUser"
    FROM posts
    JOIN follows ON
    follows."followerId" = $1
    JOIN users
    ON posts."userId" = users.id
    LEFT JOIN reposts
    ON posts.id = reposts."postId"
    WHERE posts."userId" = follows."followedId"
    ORDER BY posts.id DESC
    OFFSET $2
    LIMIT 10
  `,
    [userId, page * 10]
  );
}

export async function putPost(text, postId, userId) {
  return connection.query(
    `
    UPDATE posts
    SET text = $1
    WHERE id = $2 AND "userId" = $3
  `,
    [text, postId, userId]
  );
}
