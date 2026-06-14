# Payload Ecommerce Template Reference

This project started from the official [Payload Ecommerce Template](https://github.com/payloadcms/payload/blob/3.x/templates/ecommerce). The notes below document the template's built-in features, kept for reference as the project is customized for Racket Tuning.

## Collections

- **Users (Authentication)** — auth-enabled collection with admin panel access. See [Access Control](#access-control) and the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.
- **Pages** — layout-builder enabled, draft-enabled for previewing before publishing.
- **Media** — uploads collection with pre-configured sizes, focal point, and manual resizing.
- **Categories** — taxonomy used to group products.
- **Carts** — tracks user and guest carts, added by the [ecommerce plugin](https://payloadcms.com/docs/ecommerce/plugin#carts).
- **Addresses** — saves user addresses for checkout, added by the [ecommerce plugin](https://payloadcms.com/docs/ecommerce/plugin#addresses).
- **Orders** — tracks orders once a transaction completes, added by the [ecommerce plugin](https://payloadcms.com/docs/ecommerce/plugin#orders).
- **Transactions** — tracks transactions from initiation to completion, added by the [ecommerce plugin](https://payloadcms.com/docs/ecommerce/plugin#transactions).
- **Products and Variants** — primary collections for product details, pricing per currency, and optional variants, added by the [ecommerce plugin](https://payloadcms.com/docs/ecommerce/plugin#products).

## Globals

- `Header` — data required by the header (e.g. nav links).
- `Footer` — same as above but for the footer.

## Access Control

- `users`: Users with the `admin` role can access the admin panel and create/edit content; users with the `customer` role can only access the frontend and their own collection items.
- `pages`: Everyone can access published pages, only admins can create/update/delete.
- `products` / `variants`: Everyone can access published products, only admins can create/update/delete.
- `carts`: Customers can access their own saved cart; guests can access any unclaimed cart by ID.
- `addresses`: Customers can access their own addresses.
- `transactions`: Only admins can access these.
- `orders`: Only admins and the order's owner can access it. Guests require a valid `accessToken` (sent via email) along with the order's email.

See the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs for more details.

## User Accounts

Registered users can log in to view order history, manage saved addresses, and track ongoing orders from their account dashboard.

## Guests & Guest Order Access

Guest checkout allows users to complete purchases without creating an account:

1. The order is associated with the guest's email address.
2. A unique `accessToken` (UUID) is generated for secure order lookup.
3. An order confirmation email is sent with a secure link to view the order.

To look up an order as a guest, users visit `/find-order`, enter their email and order ID, and receive an email with a secure access link. This prevents order enumeration attacks where malicious users could iterate through sequential order IDs.

**Security note:** Order confirmation emails should include the order ID so guests can use "Find Order". The access token is only sent via the verification email.

## Layout Builder

Pages support unique layouts via a layout builder with pre-built blocks:

- Hero
- Content
- Media
- Call To Action
- Archive

## Lexical Editor

Rich-text editing with support for Payload blocks, media, links, and more. See [Lexical](https://payloadcms.com/docs/rich-text/overview) docs.

## Draft Preview

Products and pages use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts: true`, so new/edited documents are saved as drafts until published. A custom URL redirects to the front-end to securely fetch the draft version of content. See the [Draft Preview Example](https://github.com/payloadcms/payload/tree/3.x/examples/draft-preview).

## Live Preview

View the resulting page as you edit content, with full SSR support. See [Live Preview docs](https://payloadcms.com/docs/live-preview/overview).

## On-demand Revalidation

Hooks on collections and globals trigger on-demand revalidation in Next.js when pages, products, footer, or header change.

> Note: if an image has been cropped/changed, republish the page that uses it to refresh the Next.js image cache.

## SEO

Pre-configured with the [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for SEO control from the admin panel.

## Search

SSR search features integrated into Next.js with Payload.

## Currencies

Ships with USD support only by default; additional currencies can be configured via the [plugin configuration](https://payloadcms.com/docs/ecommerce/plugin#currencies). Ensure supported currencies are also configured in your payment platform.

## Stripe

Ships with the Stripe adapter configured. Set `secretKey`, `publishableKey`, and `webhookSecret` from your Stripe dashboard. See [Stripe's guide](https://docs.stripe.com/get-started/api-request?locale=en-GB).

## Jobs and Scheduled Publish

[Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) uses the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs) to publish/unpublish content on a schedule. Tasks run on a cron schedule and can run as a separate instance.

> Note: on Vercel, depending on plan tier, you may be limited to daily cron only.

## Cache

Next.js caching is disabled by default (`no-store` + `force-dynamic`), since Payload Cloud proxies and caches via Cloudflare. If self-hosting, you can re-enable Next.js caching by removing `no-store` from fetch requests in `./src/app/_api` and removing `export const dynamic = 'force-dynamic'` from page files.

## Working with Postgres

Postgres follows a strict schema. Big schema changes risk losing data if not migrated carefully.

### Local development

By default the Postgres adapter has `push: true` for development, allowing schema changes without migrations. If pointed at production, set `push: false` to avoid losing data or migration drift.

### Migrations

Create a migration locally:

```bash
pnpm payload migrate:create
```

On the server, after building and before `pnpm start`, run pending migrations:

```bash
pnpm payload migrate
```

### Racket Tuning environments

This project uses two separate Supabase Postgres databases:

- **Development/Preview** — `DATABASE_URL` points to the dev Supabase project. The Payload adapter runs with `push: true`, so schema changes made locally are applied automatically.
- **Production** — `DATABASE_URL` (Vercel "Production" environment) points to a separate Supabase project. The adapter runs with `push: false`, so schema changes only land via migrations.

Workflow for schema changes:

1. Make your collection/field changes locally and let `push` sync the dev DB.
2. Run `pnpm migrate:create <name>` to capture the change as a migration, and commit the generated files in `src/migrations/`.
3. Merge to `main` (Vercel deploys the new code automatically).
4. Run the **"Migrate production database"** GitHub Actions workflow (manual `workflow_dispatch`, requires approval via the `production` environment) to apply pending migrations to the production Supabase DB via `pnpm migrate`.

## Docker

1. Complete the steps in [Quick Start](../README.md#quick-start) — `docker-compose` uses the `.env` file in the project root.
2. Run `docker-compose up`.
3. Open the app and create your first admin user.

## Seed

Seed the database with sample pages, products, and orders via the 'seed database' link in the admin panel. This also creates a demo user:

- Demo Customer
  - Email: `customer@example.com`
  - Password: `password`

> NOTICE: seeding is destructive — it drops the current database and populates a fresh one. Only run this if starting a new project or if you can afford to lose current data.

## Production

1. Run `pnpm build` (or `npm run build`) to produce a production-ready bundle in `.next`.
2. Run `pnpm start` (or `npm run start`) to serve Payload in production.

### Deploying to Vercel

Use the Vercel Postgres adapter:

```bash
pnpm add @payloadcms/db-vercel-postgres
```

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
})
```

And Vercel Blob storage:

```bash
pnpm add @payloadcms/storage-vercel-blob
```

```ts
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
```

### Self-hosting

1. Ensure the app builds and serves in production (see [Production](#production)).
2. Deploy as any Node.js/Next.js app (VPS, DigitalOcean App Platform, Coolify, etc). See the [deployment documentation](https://payloadcms.com/docs/production/deployment).
