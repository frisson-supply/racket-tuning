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

For the full setup (Vercel env var scoping, the schema-change workflow, running/recovering production migrations), see [`docs/pipeline.md`](docs/pipeline.md).

## Documentation

This project is based on the [Payload Ecommerce Template](https://github.com/payloadcms/payload/blob/3.x/templates/ecommerce). Template-specific reference docs (collections, access control, Stripe setup, deployment, migrations, seeding, etc.) live in [`docs/payload-template.md`](docs/payload-template.md); this project's actual deployment/migrations runbook lives in [`docs/pipeline.md`](docs/pipeline.md).
