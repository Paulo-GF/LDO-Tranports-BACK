-- Deploy ldo:init to pg

BEGIN;
CREATE DOMAIN mail AS text CHECK(VALUE ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$');
--CREATE DOMAIN pass AS text CHECK(VALUE ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$');


CREATE TABLE IF NOT EXISTS "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "role" TEXT NOT NULL,
  "lastname" TEXT UNIQUE NOT NULL,
  "firstname" TEXT UNIQUE NOT NULL,
  "mail" mail UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "password" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "hash" text UNIQUE NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "job" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS "user_job" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "job_id" INT NOT NULL REFERENCES "job"(id) ON DELETE CASCADE
);

COMMIT;
