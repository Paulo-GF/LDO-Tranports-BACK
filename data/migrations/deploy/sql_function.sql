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
CREATE FUNCTION "edit_job"(jobInput json) RETURNS job AS $$

    UPDATE "job"
    SET
        title = jobInput->>'title',
        region = jobInput->>'region',
        city = jobInput->>'city',
        type = jobInput->>'type',
        description = jobInput->>'description'
    WHERE
        id = (jobInput->>'id')::int
    RETURNING *;

$$ LANGUAGE SQL;

COMMIT;
