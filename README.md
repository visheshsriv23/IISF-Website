# IISF KNIT Sultanpur website

The official site for the Innovation Incubation and Startup Foundation, KNIT Sultanpur. The style is a Neo-Brutalist campus zine.

**Stack:** Next.js 16 (App Router with Cache Components), Tailwind CSS v4, Three.js through React Three Fiber, GSAP, and Supabase (Postgres and Storage).

## Quick start

```bash
npm install
cp .env.example .env.local      # set ADMIN_PASSWORD and SESSION_SECRET at minimum
npm run dev                     # http://localhost:3000
```

Without Supabase keys, the site runs on the **placeholder seed content** in `src/server/data/seed.ts`. In that mode it is read-only, and forms and admin saves return a friendly "database not connected" error.

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL editor**, paste in `supabase/migrations/0001_init.sql` and run it. This creates the tables, the RLS policies and the private `pitch-decks` bucket.
3. Copy the **Project URL** and the **service_role key** (Project Settings → API) into `.env.local` as `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Run `npm run db:seed` to load the placeholder content. Add `-- --reset` to wipe and reseed.

The service-role key is only ever read on the server (`src/server/db.ts`, which imports `server-only`). Never prefix it with `NEXT_PUBLIC_`.

## Project structure

```
src/
  app/
    (site)/          public pages: home, about, startups, programs, events, team, apply, resources, contact
    admin/           committee admin panel (password protected by src/proxy.ts)
    api/             HTTP backend: public form endpoints + /api/admin/[resource] CRUD
  server/            BACKEND ONLY: Supabase client, cached content queries, submissions, auth, admin CRUD
  shared/            used by both sides: domain types, zod form schemas, admin resource registry
  components/
    ui/              design-system primitives (Button, Sticker, Doodle, TradingCard, Polaroid, TicketStub…)
    home/            homepage sections
    pages/           page-specific client pieces
    forms/           form fields + Apply / Contact / Committee forms
    three/           3D: HeroScene (toon-shaded props), CardStage (spinning trading card), lazy loader
    motion/          MotionLayer: every scroll and micro-interaction, driven by data attributes
    admin/           generic ResourceManager
supabase/migrations/ database schema
scripts/seed.ts      seeds Supabase from the placeholder content
```

### How the pieces fit together

- **Reads:** pages call `src/server/content.ts`. Results are cached with `"use cache"`, tagged per table and revalidated hourly. Any admin edit calls `revalidateTag(table)`, so changes appear without a redeploy.
- **Writes:** forms `POST` to `/api/*`. Route handlers stay thin and delegate to `src/server/submissions.ts` or `src/server/admin.ts`.
- **Validation:** public forms use the zod schemas in `src/shared/schemas.ts`, on the client for instant feedback and on the server as the source of truth. Admin validation is generated from `src/shared/resources.ts`. To add a field, add it to the registry and the SQL migration, and the admin form and validation pick it up automatically.
- **Motion:** components opt in with attributes such as `data-reveal`, `data-pop`, `data-draw`, `data-count`, `data-tilt` and `data-drag`. `MotionLayer` handles them all. Render it as the last child of a page, not in a layout, because layouts hydrate before streamed page content. Everything respects `prefers-reduced-motion`. Tilt and drag are desktop-only.
- **3D:** scenes are code-split (`ssr: false`) and mount only when scrolled near, so three.js never blocks LCP. The trading card face is drawn on a 2D canvas from the startup's data and uses the brand fonts.

## Admin guide (for the committee)

1. Go to `/admin` and log in with `ADMIN_PASSWORD`.
2. Pick a section in the sidebar: Startups, Events, Team, Programs, Stats, Marquee, FAQs, Testimonials or Documents.
3. **Add new** opens a side form. Click a row's pencil icon to edit it, or the bin to delete it.
4. Use one line per entry in list fields, in the form `Name | Role`, `Mar 2025 | What happened` or `photo URL | caption`.
5. **New session?** Open Team and change each member's *Group* (final, third or second) to move them up a year.
6. **Submissions** (Applications, Committee, Inbox) are read-only. Uploaded pitch decks open through a one-hour signed link.

Images are referenced by URL. Upload them to a public Supabase Storage bucket, or anywhere else, and paste the link.

## Environment variables

See `.env.example`. Optional extras:
- `RESEND_API_KEY` + `NOTIFY_EMAIL` send an email for every new submission.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` turns on privacy-friendly analytics. It tracks submissions, event register clicks, committee CTA clicks and social clicks.

## Before launch

- [ ] Replace **all** seed content. Every name, number, quote and photo in it is a placeholder.
- [ ] Get verified figures from the faculty coordinator (the stats drive the hero headline).
- [ ] Add real photos. Each photo slot shows a labelled "Placeholder photo" until it has a URL.
- [ ] Update contact details, socials and the map in `src/lib/site.ts`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Use a strong `ADMIN_PASSWORD` and a long random `SESSION_SECRET`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `start` | Production build and serve |
| `npm run lint` / `typecheck` | ESLint / TypeScript |
| `npm run db:seed` | Seed Supabase with placeholder content |
