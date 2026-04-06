# Database Migration System

This system handles database schema migrations and rollbacks for the PayAI-Guardian project.

## Commands

- `npm run migrate`: Run all pending migrations.
- `npm run rollback`: Rollback the last migration.
- `npm run status`: Show the current status of migrations.

## Creating a new migration

1. Create a new `.js` file in the `shared/migration/scripts` folder (yet to be created).
2. Follow the migration template with `up` and `down` functions.
