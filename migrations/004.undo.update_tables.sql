ALTER TABLE posts
  ALTER COLUMN date_modified SET DEFAULT now(),
  ALTER COLUMN date_modified SET NOT NULL;

ALTER TABLE users
  ALTER COLUMN date_modified SET DEFAULT now(),
  ALTER COLUMN date_modified SET NOT NULL;