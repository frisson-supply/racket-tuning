# Racket Tuning

Website for Racket Tuning, a Dutch racket-tuning specialist — built with Payload CMS and Next.js.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Payload CMS 3** — admin at `/admin`, Postgres database
- **TypeScript**
- **CSS Modules** — scoped component styles (`*.module.css`)
- **Stripe** — payments via `@payloadcms/plugin-ecommerce`

## Setup

1. Copy `.env.example` to `.env` and fill in the required values
2. `pnpm install`
3. `pnpm dev`

## Commands

| Command | Action |
| --- | --- |
| `pnpm dev` | Start dev server (localhost:3000) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm test` | Run int + e2e tests |
| `pnpm test:int` | Vitest integration tests |
| `pnpm test:e2e` | Playwright e2e tests |
| `pnpm migrate:create` | Create a Postgres migration |
| `pnpm migrate` | Run pending migrations |
| `pnpm migrate:status` | Show migration status |

## Structure

- `src/app/(app)` — storefront routes
- `src/app/(payload)` — Payload admin panel
- `src/collections`, `src/globals`, `src/blocks`, `src/heros` — Payload config (collections, globals, page-builder blocks, hero variants)
- `src/components`, `src/features` — frontend UI
- `src/payload.config.ts` — main Payload config

## Database & deployments

This project uses two separate Supabase Postgres databases — one for development/preview, one for production. Both apply schema changes only via migrations; `push` is opt-in only (`PAYLOAD_DB_PUSH=true`), for a throwaway local sandbox DB you don't mind rebuilding from scratch.

Workflow for shipping a schema change:

1. Change collections/fields locally.
2. Run `pnpm migrate:create <name>`, then `pnpm migrate` to apply it to the dev DB, then commit the generated files in `src/migrations/`.
3. Merge to `main` (Vercel deploys the new code).
4. Run the **"Migrate production database"** GitHub Actions workflow (Actions tab → "Migrate production database" → "Run workflow"). This runs against the `production` GitHub environment, which requires a `PRODUCTION_DATABASE_URL` secret pointing at the production Supabase project's pooled connection string.

See [`docs/payload-template.md`](docs/payload-template.md#racket-tuning-environments) for more detail.

## Documentation

This project is based on the [Payload Ecommerce Template](https://github.com/payloadcms/payload/blob/3.x/templates/ecommerce). Template-specific reference docs (collections, access control, Stripe setup, deployment, migrations, seeding, etc.) live in [`docs/payload-template.md`](docs/payload-template.md).
