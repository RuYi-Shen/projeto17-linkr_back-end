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
        JOIN users ON likes."userId" = users.id
        WHERE likes."postId" = $1 AND likes."userId" = $2
    `,
    [postId, userId]
  );
  const allLikes = await connection.query(
    `
        SELECT users.username FROM likes
        JOIN users ON likes."userId" = users.id
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
  return connection.query(`
      SELECT * 
      FROM posts 
      WHERE "userId"=$1 
      ORDER BY id DESC 
      LIMIT 1`,[userId]);
} 

export async function postComment(text, postId, userId) {
  return connection.query(
    `
        INSERT INTO comments (text, "postId", "userId")
        VALUES ($1, $2, $3)
    `,
    [text, postId, userId]
  );
}

export async function getPostComments(postId) {
  return connection.query(
    `
        SELECT username, "pictureURL", text, "postId", "userId"
        FROM comments
        JOIN users
        ON comments."userId" = users.id
        WHERE "postId" = $1
        ORDER BY comments."createdAt" DESC
        LIMIT 10
    `,
    [postId]
  );
}

export async function deleteComment(id) {
  return connection.query(
    `
        DELETE FROM comments
        WHERE "id" = $1
    `,
    [id]
  );
}

export async function totalComments(postId) {
  return connection.query(
    `
        SELECT COUNT(*) FROM comments
        WHERE "postId" = $1
    `,
    [postId]
  );
}