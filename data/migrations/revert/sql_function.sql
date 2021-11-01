-- Revert ldo:sql_function from pg

BEGIN;

DROP FUNCTION IF EXISTS "new_job" (jobInput json), "edit_job"(jobInput json);

COMMIT;
