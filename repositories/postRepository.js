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

export async function getLikes(postId, userId) {
  const userLiked = await connection.query(
    `
        SELECT users.username FROM likes
        jOIN users ON likes."userId" = users.id
        WHERE likes."postId" = $1 AND likes."userId" = $2
    `,
    [postId, userId]
  );
  const allLikes = await connection.query(
    `
        SELECT users.username FROM likes
        jOIN users ON likes."userId" = users.id
        WHERE "postId" = $1 AND "userId" != $2
        ORDER BY likes.id DESC
        LIMIT 2
    `,
    [postId, userId]
  );
  return { userLiked, allLikes };
}

export async function countLikes(postId) {
  const likes = await connection.query(
    `
        SELECT COUNT(*) FROM likes
        WHERE "postId" = $1
    `,
    [postId]
  );
  return likes.rows[0].count;
}

export async function removePostLikes(postId) {
  return connection.query(
    `
        DELETE FROM likes
        WHERE "postId" = $1
    `,
    [postId]
  );
}

export async function removePost(postId, userId) {
  return connection.query(
    `
        DELETE FROM posts
        WHERE "id" = $1 AND "userId" = $2
    `,
    [postId, userId]
  );
}

export async function findPostId(userId){
  return await db.query(`
      SELECT * 
      FROM posts 
      WHERE "userId"=$1 
      ORDER BY id 
      DESC LIMIT 1`,[userId]);
} 