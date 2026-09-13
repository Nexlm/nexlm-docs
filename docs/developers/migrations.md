# Migrations and seeding

## Development

Change `server/prisma/schema.prisma`, then:

```bash
npm run db:migrate            # prisma migrate dev
```

Prisma creates a new folder in `server/prisma/migrations/` and regenerates the client. Commit the migration with the schema change.

## Production

```bash
npm run db:deploy -w server   # prisma migrate deploy
```

This applies pending migrations without generating new ones. The Render blueprint runs it as a pre-deploy command.

## Other commands

| Command | Description |
| --- | --- |
| `npm run db:generate -w server` | Regenerate the Prisma client |
| `npm run db:studio -w server` | Open Prisma Studio |
| `npm run db:seed` | Create or promote an admin (see [admin access](/admin/access)) |

## Guidelines

- Never edit an applied migration; add a new one.
- Adding a value to a Postgres enum is safe; removing or renaming one needs a data migration.
- Backfill non-nullable columns in the same migration that adds them.
