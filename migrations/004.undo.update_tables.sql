ALTER TABLE posts
  ALTER COLUMN 
    date_modified TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE users
  ALTER COLUMN 
    date_modified TIMESTAMPTZ NOT NULL DEFAULT NOW();