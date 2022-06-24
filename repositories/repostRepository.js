import connection from "../config/database.js";

export async function registerRepost(postId, userId) {
  return connection.query(
    `
        INSERT INTO reposts ("postId", "userId")
        VALUES ($1, $2)
    `,
    [postId, userId]
  );
}

export async function removeRepost(postId, userId) {
  return connection.query(
    `
        DELETE FROM reposts
        WHERE "postId" = $1 AND "userId" = $2
    `,
    [postId, userId]
  );
}

export async function getAllReposts(postId) {
  const allReposts = await connection.query(
    `
        SELECT "userId" FROM reposts
        WHERE "postId" = $1
    `,
    [postId]
  );
  return allReposts;
}