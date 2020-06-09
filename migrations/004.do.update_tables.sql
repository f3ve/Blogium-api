ALTER TABLE users
  ALTER COLUMN
    date_modified TIMESTAMPTZ;

ALTER TABLE posts
  ALTER COLUMN
    date_modified TIMESTAMPTZ;