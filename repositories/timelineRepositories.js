import connection from "../config/database.js";

export async function createPost(url, text, userId) {
    return connection.query(`
      INSERT INTO posts (url, text, userId) 
      VALUES ($1, $2, $3)`, 
      [url, text, userId]
    );
};