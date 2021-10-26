-- Deploy ldo:seeding to pg
BEGIN;
INSERT INTO
  public."user"(role, lastname, firstname, mail)
VALUES
  ('admin', 'doe', 'Benoît', 'benoit.doe@gmail.com');

INSERT INTO
  public.password(hash, user_id)
VALUES
  ('Jesuis-benoit31', 1);

INSERT INTO
  public.job(title, region, city, type, description)
VALUES
  ('Chauffeur SPL', 'Puy-de-Dôme', 'Gerzat', 'CDI', 'Cherchons un conducteur'),
  ('Chauffeur Porte-caisse', 'Occitanie', 'Toulouse', 'CDD', 'Cherchons une conductrice');

INSERT INTO
  public.user_job(user_id, job_id)
VALUES
  (1, 1),
  (1, 2);

COMMIT;