DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE follows (
    following_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    followed_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (following_user_id, followed_user_id)
);