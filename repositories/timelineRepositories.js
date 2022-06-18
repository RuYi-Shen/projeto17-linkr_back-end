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
    SELECT url, username, "likesCount", "userId", text, "pictureURL"
    FROM posts
    JOIN users
    ON posts."userId" = users.id
    ORDER BY posts.id DESC
    LIMIT 20
  `);
}