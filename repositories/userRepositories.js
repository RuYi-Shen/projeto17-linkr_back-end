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

export async function searchUsersLike(search){
  return connection.query(`
    SELECT id, username, "pictureURL" 
    FROM users
    WHERE username LIKE $1 
    LIMIT 5 
  `, [`${search}%`])
};