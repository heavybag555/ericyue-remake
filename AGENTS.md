## Learned User Preferences

- Preserve the exact visual and organizational presentation of the site at all times — no layout, ordering, naming, tagging, or filter behavior may change without explicit instruction.
- Keep all tagging and naming conventions from the original static data file (`src/data/projectsData.jsx`) consistent throughout the codebase and CMS schema.
- Sanity Studio is embedded in this app at `/studio` — do not create a separate Sanity project or repo.
- Split server data-fetching into `page.jsx` (async server component) and `*-client.jsx` (interactive client component) — follow this pattern for all routes.
- All page server components should export `revalidate = 60` for ISR so Sanity edits appear within 60 seconds.
- Use JavaScript (`.js` / `.jsx`), not TypeScript — this project has no TypeScript configuration.
- Dev server runs with Turbopack: `npm run dev` (uses `--turbopack` flag internally).

## Learned Workspace Facts

- **Client:** Giovanni Sotomayor (Gio) — a photographer. This is his portfolio site.
- **Stack:** Next.js 15 (App Router), Sanity CMS (`next-sanity@11.6.12` for Next 15 compat), Zustand, Framer Motion, Lenis (smooth scroll), Tailwind CSS v4, React 18.
- **Content model:** Sanity `project` document has fields: `projectId` (URL slug), `index`, `title`, `author`, `category`, `camera`, `filmStock`, `sortOrder`, `mediaItems[]` (each with `mediaType`, `mediaUrl`/`imageRef`).
- **Data layer:** `src/sanity/queries.js` contains GROQ queries that map Sanity documents back to the same object shape the frontend components expect — do not change field names in the mapper without updating all consumers.
- **Sanity helpers:** `src/sanity/client.js` (configured client), `src/sanity/image.js` (URL builder via `@sanity/image-url`), `src/sanity/env.js` (env var exports).
- **Media:** Portfolio images live under `public/update-photos/<project-folder>/` locally; after migration they are served from `cdn.sanity.io` — both remote patterns are allowed in `next.config.mjs`.
- **Migration script:** `scripts/migrate-to-sanity.mjs` is a one-time script to upload images and seed Sanity documents; do not re-run it after initial migration.
- **Component convention:** each component lives at `src/components/<kebab-name>/<kebab-name>.jsx`.
- **State management:** global UI state (filters, view mode, etc.) is in `src/store/zustand.jsx` using Zustand.
- **Required env vars:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (default `production`), `NEXT_PUBLIC_SANITY_API_VERSION` (default `2024-01-01`), `SANITY_API_TOKEN` (write token, only needed for migration script).
- **Filters:** category filter values in the UI must always reflect what is stored in Sanity — they are driven by the `category` field on the `project` schema, not hardcoded.
