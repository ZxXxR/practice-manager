CREATE TYPE PERSONTYPE AS ENUM ('responsible', 'representative');
CREATE TYPE PRACTICETYPE AS ENUM ('educational', 'production');

CREATE TABLE IF NOT EXISTS roles(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    access_level INT NOT NULL DEFAULT 0,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY,
    number TEXT NOT NULL,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS contracts(
    id SERIAL PRIMARY KEY,
    number TEXT NOT NULL,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS legal_forms(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS directions(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS dates(
    id SERIAL PRIMARY KEY,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS persons(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    secondName VARCHAR(32),
    number TEXT,
    email VARCHAR(64),
    position Text,
    communication TEXT,
    type PERSONTYPE NOT NULL,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS bases(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    form INTEGER NOT NULL,
    direction INTEGER NOT NULL,
    representative INTEGER NOT NULL,
    responsible INTEGER NOT NULL,
    comment TEXT,
    UNIQUE(id),
    FOREIGN KEY (form) REFERENCES legal_forms(id),
    FOREIGN KEY (direction) REFERENCES directions(id),
    FOREIGN KEY (representative) REFERENCES persons(id),
    FOREIGN KEY (responsible) REFERENCES persons(id)
);


CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    secondName VARCHAR(32),
    username VARCHAR(32) NOT NULL UNIQUE,
    login VARCHAR(32) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    token VARCHAR(32) NOT NULL,
    roles INT[],
    group_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TABLE IF NOT EXISTS practices(
    id SERIAL PRIMARY KEY,
    student INTEGER NOT NULL UNIQUE,
    contract INTEGER NOT NULL,
    base INTEGER NOT NULL,
    period INTEGER NOT NULL,
    comment TEXT,
    type PRACTICETYPE DEFAULT 'production',
    FOREIGN KEY (student) REFERENCES users(id),
    FOREIGN KEY (contract) REFERENCES contracts(id),
    FOREIGN KEY (base) REFERENCES bases(id),
    FOREIGN KEY (period) REFERENCES dates(id)
);