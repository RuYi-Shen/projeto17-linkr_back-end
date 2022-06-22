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
  ORDER BY posts."createdAt" DESC
  LIMIT 20`,
    [hashtag]
  );
}

export async function insertHashtag(nameHashtag){
  return connection.query(`
      INSERT INTO hashtags (tag) 
      VALUES($1)`, 
      [nameHashtag]);
}

export async function verifyHashtag(nameHashtag){
  const hashtag = await connection.query(`
      SELECT * FROM hashtags WHERE tag = $1
      `, [nameHashtag]);
  return hashtag;
}

export async function addPostHashtags(postId, hashtagId){
  return connection.query(`
      INSERT INTO posts_tags("postId", "tagsId")
      VALUES ($1, $2)
  `, [postId, hashtagId]);
}

export async function deletePostHashtags(postId){
  return connection.query(`
      DELETE FROM posts_tags 
      WHERE "postId"=$1
  `, [postId]);
}

export async function getTrendings() {
  return connection.query(`
    SELECT hashtags.name AS hashtag, COUNT("tagsId") AS frequency FROM "posts_tags" 
    JOIN hashtags ON "tagsId"=hashtags.id 
    JOIN posts ON "postId" = posts.id 
    WHERE posts."createdAt" > now() 
    GROUP BY hashtags.name
    ORDER BY frequency DESC
    LIMIT 10
  `);
}