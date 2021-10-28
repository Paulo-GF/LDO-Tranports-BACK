-- Revert ldo:init from pg

BEGIN;

DROP FUNCTION IF EXISTS "new_job" (jobInput json), "edit_job"(jobInput json);
DROP TABLE IF EXISTS "user_job", "user", "password", "job" CASCADE;

COMMIT;
