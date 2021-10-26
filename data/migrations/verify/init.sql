-- Verify ldo:init on pg

BEGIN;

SELECT "role", "lastname", "firstname", "mail" FROM "user";

SELECT "hash", "user_id" FROM "password";

SELECT "user_id", "job_id" FROM "user_job";

SELECT "title", "region", "city", "type", "description" FROM "job";
ROLLBACK;
