import connection from "../config/database.js";

export async function insertFollow(followerId, followedId){
    return connection.query(`
        INSERT INTO "follows" ("followerId", "followedId")
        VALUES ($1, $2)
    `, [followerId, followedId])
}

export async function deleteFollow(followerId, followedId){
    return connection.query(`
        DELETE FROM "follows"
        WHERE "followerId" =  $1 AND "followedId" = $2
    `, [followerId, followedId])
};

export async function checkFollowByIds(followerId, followedId){
    return connection.query(`
        SELECT *
        FROM "follows"
        WHERE "followerId" =  $1 AND "followedId" = $2
    `, [followerId, followedId])
}