import connection from "../config/database.js";

export async function getPosts(hashtag) {
  return connection.query(
    `
  SELECT posts.id, url, username, "likesCount", "userId", text, "pictureURL"
  FROM posts
  JOIN posts_tags
  ON posts.id = posts_tags."postId"
  JOIN hashtags
  ON posts_tags."tagsId" = hashtags.id
  WHERE hashtags.tag = $1
  ORDER BY posts."createdAt" DESC`,
    [hashtag]
  );
}

export async function getTrendings() {
  return await db.query(`
    SELECT hashtags.name AS hashtag, COUNT("tagsId") AS frequency FROM "posts_tags" 
    JOIN hashtags ON "tagsId"=hashtags.id 
    JOIN posts ON "postId" = posts.id 
    WHERE posts."createdAt" > now() 
    GROUP BY hashtags.name
    ORDER BY frequency DESC
    LIMIT 10
  `);
}