# Instructions for Claude

## Keep documentation in sync

Whenever a change touches something a `.md` file documents, update that file in the same change — don't leave docs to drift. Check in particular:

- `README.md` — features, pages/routes table, tech stack, environment variables, scripts, project structure
- `.env.example` — must stay in sync with every environment variable the README's env var table lists and every variable the code actually reads
- `docs/` — deployment, testing, accessibility, SEO, maintenance and handoff guides
- `sanity/docs/` — Studio editor guides
- Root setup guides (`ANALYTICS_SETUP.md`, `CLOUDINARY_SETUP.md`, `EMAIL_SETUP.md`, `CONTENT_SEED_GUIDE.md`)

If a change adds/removes a route, env var, script, dependency, or top-level directory, or changes documented behavior (e.g. what triggers revalidation), grep the relevant `.md` files for stale references before considering the change done.
