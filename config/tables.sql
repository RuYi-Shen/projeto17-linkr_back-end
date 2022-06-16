CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "pictureURL" TEXT NOT NULL,
    "createdAt"  TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()  
);

CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "url" TEXT NOT NULL,
    "text" TEXT,
    "likesCount" INTEGER DEFAULT(0),
    "createdAt"  TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()  
);

CREATE TABLE "likes" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "postId" INTEGER REFERENCES posts(id)
);

CREATE TABLE "hashtags" (
    "id" SERIAL PRIMARY KEY,
    "tag" TEXT NOT NULL
);

CREATE TABLE "posts_tags" (
    "id" SERIAL PRIMARY KEY,
    "tagsId" INTEGER REFERENCES hashtags(id),
    "postId" INTEGER REFERENCES posts(id)
);