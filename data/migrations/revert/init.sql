-- Revert ldo:init from pg

BEGIN;

DROP TABLE IF EXISTS "user_job", "user", "password", "job" CASCADE;

COMMIT;
