# Claude Code

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

## Project Overview

This is the website for **Racket Tuning**, a Dutch racket-tuning specialist focused on a personalised, hands-on approach. The site is built on Payload CMS + Next.js (ecommerce template base).

**Primary focus — services** (these drive the site's design and content priorities):
- Racket tuning / matching
- 3D-printed grip pallets
- Grip molding
- On-court (string/play) analysis
- Racket stringing

**Secondary — webshop**: An ecommerce section exists (Products/Categories collections, Stripe checkout) but is not the main focus. Service pages and the personal/professional presentation of the owner take priority over shop features.

**Content management**: Pages, services, and site content are managed through the Payload CMS admin — prefer adding/extending collections, globals, and blocks over hardcoding content.

**Payments**: Stripe is the payment provider (via `@payloadcms/plugin-ecommerce` Stripe adapter).

**Analytics (planned)**: PostHog will be added for analytics, with the goal of surfacing PostHog data/insights inside the Payload CMS admin (e.g. a custom dashboard view or admin component). Not yet implemented — when working on analytics, design with this CMS-visibility goal in mind.

**Design priorities**: Modern, clean, easy to navigate — emphasize personal/specialist branding over generic ecommerce aesthetics.

## Project Structure & Styling

**Tech stack**: Next.js 16 (App Router) + React 19, Payload CMS 3 with Postgres, TypeScript, Tailwind CSS 4.

**Folder layout** (`src/`):
- `app/` — Next.js App Router routes, incl. `(app)` route group for the storefront and `(payload)` for the admin panel
- `collections/` — Payload collections (Pages, Products, Categories, Users, Media)
- `globals/` — Payload globals (Header, Footer)
- `blocks/` — page-builder blocks used by the Pages collection's layout field (Banner, Carousel, CTA, Content, Form, MediaBlock, Archive, ThreeItemGrid, etc.)
- `heros/` — hero section variants selectable per page
- `components/` — shared React components (checkout, cart, forms, UI primitives)
- `fields/`, `access/`, `hooks/`, `endpoints/`, `plugins/` — Payload config building blocks (custom fields, access control, hooks, custom API routes, plugin config)
- `providers/`, `utilities/`, `lib/` — frontend support code
- `payload.config.ts` — main Payload config wiring collections, globals, and plugins together

When adding new content types (e.g. a "Services" collection/pages, before/after galleries, testimonials), follow this collection/block/hero pattern rather than building one-off pages.

**Styling**: Currently Tailwind CSS 4 with config in `tailwind.config.mjs` and global styles in `src/app/(app)/globals.css`. Design tokens (colors, radii, etc.) are defined as CSS variables in `:root` / `[data-theme='dark']` using `oklch()` color values, then mapped into Tailwind's `@theme`. Prefer using existing tokens (`--primary`, `--background`, `--card`, etc.) so the personalised branding stays consistent.

**Planned styling direction**: The project is moving toward **CSS Modules with CSS `@layer`** instead of Tailwind utility classes. When creating or significantly touching components, prefer co-located `*.module.css` files using `@layer` (e.g. `reset, base, components, utilities, overrides`) over adding Tailwind utility classes, and reuse the existing CSS variable design tokens defined in `globals.css`. Migration is incremental — don't do a mass rewrite of unrelated components, but new/changed components should follow the CSS Modules approach.

## Documentation

The `README.md` covers setup and commands. Reference docs for the underlying Payload Ecommerce Template (collections, access control, Stripe, deployment, migrations, seeding, etc.) live in `docs/payload-template.md`.

## Secrets

NEVER read, open, or print the contents of `.env` (or any `.env.*` file containing real secrets). If you need to know which variables are defined, ask the user or check `.env.example` for the variable names only.
