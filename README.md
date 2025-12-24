# Web (apps/web)

Next.js App Router app with TypeScript and Tailwind.

Scripts:
- `npm run dev` — run the web app (from repo root runs workspace script)
- `npm run build` — build for production
- `npm run test` — run unit tests (Vitest)
- `npm run next-sitemap` — generate sitemap.xml (used in CI)

AdSense checklist
- Replace `DATA-ADSENSE-CLIENT` and `DATA-ADSENSE-SLOT` in `components/Adsense.tsx` with real values.
- Add privacy policy and ensure consent where required.
- Add `public/ads.txt` publisher lines.

SEO checklist
- Each tool page uses Sanity long-form content (700–1200 words) and includes FAQ with JSON-LD.
- H1 contains the main keyword and first paragraph answers the query.
- Pages use `revalidate = 86400` for ISR.
- `next-sitemap` is configured in `next-sitemap.js` and runs via `npm run next-sitemap`.

Deploy
- Deploy `apps/web` to Vercel and add `NEXT_PUBLIC_SITE_URL` environment variable.
