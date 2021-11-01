-- Deploy ldo:sql_function to pg

BEGIN;

-- POST Function : for adding new job
CREATE OR REPLACE FUNCTION "new_job" (jobInput json) RETURNS job AS $$

INSERT INTO "job"
    (
        title,
        region,
        city,
        type,
        description
    )
    VALUES
    (
        jobInput->>'title',
        jobInput->>'region',
        jobInput->>'city',
        jobInput->>'type',
        jobInput->>'description'
    )
    RETURNING *;
$$ LANGUAGE SQL;

-- PATCH Function : check values for editing job by id
CREATE FUNCTION "edit_job"(json) RETURNS void AS $$

    UPDATE "job"
    SET
        title = $1->>'title',
        region = $1->>'region',
        city = $1->>'city',
        type = $1->>'type',
        description = $1->>'description'
    WHERE
        id = ($1->>'id')::int;
$$ LANGUAGE SQL STRICT;

COMMIT;
