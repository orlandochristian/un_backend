-- DROP DATABASE IF EXISTS belgium;
-- CREATE DATABASE belgium;


--  \c belgium;



--  CREATE TABLE bmci (
--     id SERIAL PRIMARY KEY,
--     book_name varchar(255),
--     chapter varchar(255),
--     titulo_articulo varchar(255) not null,
--     articulo text not null,
--     autor varchar(255) not null,
--     authorizedby varchar(255) not null,
--     area_id INTEGER NOT NULL REFERENCES areas (id)

--  );


--  CREATE TABLE areas (
--     id SERIAL PRIMARY KEY,
--     areaname varchar(255),
--     descripcion varchar(255),
--     assistant varchar(255),
--     visible boolean
--  );

--  CREATE TABLE departments (
--     id SERIAL PRIMARY KEY,
--     titular varchar(255),
--     back_up varchar(255),
--     descripcion varchar(255),
--     visible boolean,
--     area_id INTEGER NOT NULL REFERENCES areas (id)
--  );

--   CREATE TABLE offices (
--     id SERIAL PRIMARY KEY,
--     title varchar(255),
--     descripcion varchar(255),
--     visible boolean,
--     department_id INTEGER NOT NULL REFERENCES departments (id)
--  );

-- Enable pgvector extension
-- CREATE EXTENSION IF NOT EXISTS vector;

-- Recreate the users table with the correct columns
-- CREATE TABLE IF NOT EXISTS topics (
--     id SERIAL PRIMARY KEY,
--     topic varchar(255),
--     descripcion varchar(255),
--     person_responsable varchar(255),
--     person_backup varchar(255),
--     icon_name varchar(255)
-- );

-- Adding the embedding column to store vectors (1536 is for OpenAI)
-- ALTER TABLE users ADD COLUMN embedding vector(1536);

--Updating the embedding column to store vectors (768 for GeminiAI)
ALTER TABLE bmci ADD  embedding TYPE vector(768);