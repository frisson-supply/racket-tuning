# Deployment & Migrations Pipeline

This documents Racket Tuning's actual database/deployment setup and the operational runbook for shipping a schema change. For generic Payload + Postgres migration mechanics (the `migrate`/`migrate:create` commands themselves), see [`payload-template.md`](payload-template.md#working-with-postgres).

## Environments

This project uses two separate Supabase Postgres databases:

- **Local development** — `DATABASE_URL` points to the dev Supabase project. Schema changes land via migrations, same as production.
- **Production** — `DATABASE_URL` (Vercel "Production" environment) points to a separate Supabase project. Schema changes only land via migrations.

Schema changes only ever happen through a tracked migration — in every environment, dev included (`push` is opt-in only, via `PAYLOAD_DB_PUSH=true`, for a throwaway local sandbox DB you don't mind rebuilding from scratch). This keeps the dev DB in lockstep with the migration history instead of silently drifting from it, which used to cause `pnpm migrate` to fail with "relation already exists" once dev and the migration history disagreed about what had already been applied.

### Vercel env var scoping

In Vercel, `DATABASE_URL` is scoped per environment (Project → Settings → Environment Variables) — the **Production** entry points at the production Supabase project, and a separate **Preview** (+ Development) entry points at the dev Supabase project, matching local `.env`. Multiple rows sharing the name `DATABASE_URL` is expected; Vercel injects whichever one matches the environment being built. Preview deployments should always read/write the dev DB, never production — pointing Preview at prod risks concurrent PR branches colliding on live data and on each other's pending migrations.

> **Preview deployments do not push schema.** Payload ignores `push` whenever
> `NODE_ENV === 'production'`, and `next build` always sets it — so *every* Vercel
> deployment, preview included, gets its schema from migrations only. A preview
> build whose `DATABASE_URL` has no migrations applied will fail at "Collecting
> page data" with `relation "…" does not exist` (Postgres `42P01`). Preview needs
> the same migration treatment as production, against whichever database it points at.

## Workflow for a schema change

1. Make your collection/field changes locally.
2. Run `pnpm migrate:create <name>` — Payload introspects your dev DB and diffs it against the config to generate the migration.
3. **Read the generated SQL in `src/migrations/<name>.ts` before committing.** If your dev DB had accumulated changes across more than one unrelated edit since the last migration (or the last migration ran outside the normal flow), the diff can bundle in statements that duplicate an earlier migration — e.g. re-dropping a column an earlier migration already dropped. That migration then fails wherever the earlier one already ran. Delete any such duplicate statements (from both `up()` and `down()`) before committing.
4. Run `pnpm migrate` to apply it to the dev DB immediately, then commit the generated files in `src/migrations/`.
5. Merge to `main` (Vercel deploys the new code automatically).
6. Apply it to production — see below.

## Running the production migration

Actions tab → **"Migrate production database"** → **Run workflow**:

1. Set **"Use workflow from"** to the branch containing your migration (not `main`, if it hasn't merged yet — that branch's `src/migrations/` is what actually gets checked out and run).
2. First run with **"Actually run migrations" unchecked** — this only runs `pnpm migrate:status` against production, so you can confirm exactly which migrations are pending before touching anything.
3. Run it again, same branch, with the checkbox **checked** — this applies them for real via `pnpm migrate`.

If a migration fails partway through, nothing is left half-applied: Payload sends each migration's SQL as one multi-statement query, which Postgres wraps in an implicit transaction, so a failing statement rolls back the whole migration. Fix the migration file (see step 3 above) and re-run the same two-pass loop.

## If a DB ever drifts from the migration history anyway

This can happen if `PAYLOAD_DB_PUSH=true` was set against a shared DB by mistake, or from an older checkout. `pnpm migrate` will fail trying to re-run DDL for tables/columns that already exist. To recover without losing data, baseline the DB: insert one row per already-applied migration directly into the `payload_migrations` table (`name`, an incrementing `batch`, `created_at`/`updated_at`) via the Supabase SQL editor, matching the migration names in `src/migrations/`. No DDL is replayed and existing content is untouched. Then `pnpm migrate:status` should show zero pending, and the normal workflow above resumes.

**Only baseline a migration if its schema genuinely already exists** (e.g. it was pushed live via `PAYLOAD_DB_PUSH=true`) — verify first with a query like:
```sql
select table_name from information_schema.tables
where table_schema = 'public' and table_name like '%your_new_table%';
```
Baselining a migration whose tables don't actually exist marks it "applied" without ever creating them — `pnpm migrate` will then skip it forever, and the app will fail at runtime with `relation "…" does not exist` (Postgres `42P01`) the next time it queries that table.
