import connection from "../config/database.js";

async function getPosts(hashtag) {
  return connection.query(
    `
  SELECT url, username, "likesCount", "userId", text, "pictureURL"
  FROM posts
  JOIN posts_tags
  ON posts.id = posts_tags."postId"
  JOIN hashtags
  ON posts_tags."tagsId" = hashtags.id
  WHERE hashtags.tag = $1`,
    [hashtag]
  );
}

export const tagRepository = {
    getPosts
  };