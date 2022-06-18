import connection from "../config/database.js";

export async function registerLike(postId, userId) {
  return connection.query(
    `
        INSERT INTO likes ("postId", "userId")
        VALUES ($1, $2)
    `,
    [postId, userId]
  );
}

export async function removeLike(postId, userId) {
  return connection.query(
    `
        DELETE FROM likes
        WHERE "postId" = $1 AND "userId" = $2
    `,
    [postId, userId]
  );
}
