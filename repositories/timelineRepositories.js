import connection from "../config/database.js";

export async function createPost(url, text, userId) {
    return connection.query(`
      INSERT INTO posts (url, text, "userId") 
      VALUES ($1, $2, $3)`, 
      [url, text, userId]
    );
};

export async function getPosts() {
  return connection.query(`
    SELECT posts.id, url, username, "likesCount", "userId", text, "pictureURL"
    FROM posts
    JOIN users
    ON posts."userId" = users.id
    ORDER BY posts.id DESC
    LIMIT 20
  `);
}

export async function putPost(text, postId, userId) {
  return connection.query(`
    UPDATE posts
    SET text = $1
    WHERE id = $2 AND "userId" = $3
  `, [text, postId, userId]);
}