-- =============================================================================
-- init.sql  —  Docker entrypoint bootstrap file
-- Docker Compose mounts this to /docker-entrypoint-initdb.d/
-- Postgres runs it automatically the FIRST time the container starts.
-- =============================================================================

\echo '>>> Creating schema...'
\i /docker-entrypoint-initdb.d/schema.sql

\echo '>>> Seeding data...'
\i /docker-entrypoint-initdb.d/seed.sql

\echo '>>> Database ready!'
