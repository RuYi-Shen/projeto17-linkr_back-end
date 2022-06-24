import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import connection from "../config/database.js";

export async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
};

export async function createUser(username, email, password, pictureURL) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);
    return connection.query(`
      INSERT INTO users (username, email, password, "pictureURL") 
      VALUES ($1, $2, $3, $4)`, 
      [username, email, passwordHash, pictureURL]
    );
};
 
export async function getUserPicById(id){
  return connection.query(
    `
  SELECT "pictureURL"
  FROM users
  WHERE id = $1`,
    [id]
  );
};

export async function searchUsersLike(id, search){
  return connection.query(`
    SELECT u.id, u.username, u."pictureURL", CASE WHEN f.id IS NULL THEN false ELSE true END as following
    FROM users u
    LEFT JOIN follows f ON f."followerId" = $1 and f."followedId" = u.id
    WHERE u.username ILIKE $2
    ORDER BY following DESC
    LIMIT 5
  `, [id,`${search}%`])
};