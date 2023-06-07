create TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL
);

create TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id),
    date VARCHAR(255) NOT NULL
);