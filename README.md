# Tools Monorepo

Monorepo containing a Next.js frontend and Sanity Studio for content. Uses npm workspaces.

Requirements
- Node.js 20+
- npm

Quickstart
1. Install: `npm ci`
2. Dev (web): `npm run dev` (runs `apps/web` dev server)
3. Dev (studio): `npm run studio:dev`

See `apps/web/README.md` for app-specific instructions.

✅ This repo includes:
- SEO-first Next.js App Router app in `apps/web`
- Sanity Studio in `packages/studio` for content and SEO
- Client-side calculators and pure functions with unit tests
- Sitemap & robots, JSON-LD for FAQ and Breadcrumbs
- GitHub Actions CI for lint → test → build → sitemap
