# Traveliga

Hebrew-language (RTL) website for **Traveliga** — Meital's personal accompaniment service and guide to living in and visiting Berlin. The site publishes articles, photo and video galleries, and customer recommendations, all editable from a Sanity Studio without touching code.

Built with Next.js 16 (App Router, React 19), Sanity as the CMS, Cloudinary for media, and Resend for transactional email.

**Live site:** [traveliga-dana20.vercel.app](https://traveliga-dana20.vercel.app) (placeholder Vercel subdomain — no custom domain purchased yet)

---

## Current status

- **Rebrand complete**: renamed from "Liga Deals Berlin" to **Traveliga** across the codebase, GitHub repo (`dg-dana/traveliga`), Vercel project, and Sanity project. Verified clean by two independent QA passes — see [`CLAUDE_CODE_FIX_REPORT.md`](CLAUDE_CODE_FIX_REPORT.md) and [`QA_FOLLOWUP_REPORT.md`](QA_FOLLOWUP_REPORT.md) (both resolved; fixes landed in PRs [#11](https://github.com/dg-dana/traveliga/pull/11), [#12](https://github.com/dg-dana/traveliga/pull/12), [#13](https://github.com/dg-dana/traveliga/pull/13)).
- **Deployment protection** (Vercel Authentication) is currently **disabled** so the site is publicly reachable for QA — re-enable it in Vercel Project Settings → Deployment Protection if that public exposure wasn't intended long-term.
- **Next step**: buy a real domain — `traveliga.com` is used as a placeholder throughout metadata, emails, and `.env`, but no domain has actually been purchased yet. Once one is bought, confirm/update it in the `NEXT_PUBLIC_SITE_URL`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`, and `CONTACT_TO_EMAIL` rows in [Environment variables](#environment-variables) below, plus the Sanity `siteSettings.email` field, then point the Vercel project and Resend domain verification at it.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Content management](#content-management)
- [Testing and quality checks](#testing-and-quality-checks)
- [Accessibility and privacy](#accessibility-and-privacy)
- [Deployment](#deployment)
- [Further documentation](#further-documentation)

---

## Features

- **Full RTL Hebrew site** — `lang="he" dir="rtl"`, Hebrew web fonts (Heebo + Assistant), Hebrew-labelled CMS.
- **CMS-driven content** — articles/posts, photo and video galleries, testimonials, authors, categories and global site settings all live in Sanity.
- **Testimonial review workflow** — custom Sanity document actions (approve, approve & feature, reject, reset to pending) so only approved recommendations reach the site.
- **Contact form with email delivery** — `POST /api/contact` validates input, enforces same-origin checks, a per-IP rate limit (5 submissions/hour) and explicit privacy consent, then sends a Hebrew notification email through Resend. Richer React Email templates (notification + thank-you) live in `lib/email/` for when HTML mail is wired up.
- **On-demand revalidation** — `POST /api/revalidate` verifies the Sanity webhook HMAC signature and revalidates the affected paths, so published content appears within seconds.
- **SEO** — per-page metadata helpers, Open Graph/Twitter cards, JSON-LD structured data (Website + Organization), generated `sitemap.ts` and `robots.ts`.
- **Accessibility** — skip link, accessibility widget (text size, high contrast, reduced motion) persisted across visits and applied before first paint, a published accessibility statement, and motion-preference-aware animations.
- **Privacy compliance** — cookie consent banner gating Google Analytics, a privacy policy page, consent checkbox on the contact form, and a re-openable cookie settings control.
- **Performance** — Turbopack builds, lazy-loaded below-the-fold sections, AVIF/WebP image optimization from Cloudinary and Sanity CDN, bundle analyzer, Lighthouse CI script.
- **Security headers and rate limiting** — HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy` from `next.config.ts`, plus CORS/rate limiting in `proxy.ts`.
- **Floating WhatsApp button** — contact number pulled from Sanity site settings.

### Pages

| Route | Description |
|-------|-------------|
| `/` | Hero, featured section, contact preview |
| `/about` | About the service and "Meet Meital" (CMS-editable) |
| `/blog` | Article listing |
| `/blog/[slug]` | Article page (Portable Text) |
| `/gallery/photos` | Photo gallery |
| `/gallery/videos` | Video gallery |
| `/recommendations` | Approved customer testimonials |
| `/contact` | Contact form and contact details |
| `/accessibility` | Accessibility statement |
| `/privacy`, `/terms` | Privacy policy and terms |
| `/api/contact`, `/api/revalidate` | Route handlers |

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router) with Turbopack, React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 with a navy/gold brand palette, `next-themes` |
| Animation | Framer Motion (wrapped in a reduced-motion provider) |
| CMS | Sanity v5 (`next-sanity`, `@sanity/client`, Vision, structure tool) |
| Media | Cloudinary + Sanity image CDN, `sharp` |
| Email | Resend + React Email |
| Icons | `react-icons` |
| Testing | Jest 30, Testing Library, jsdom |
| Tooling | ESLint 9 (`eslint-config-next`), Prettier, `@next/bundle-analyzer`, Lighthouse CI, `tsx` |

---

## Getting started

### Prerequisites

- **Node.js >= 22.12** (enforced via `package.json` `engines`)
- npm
- Accounts for [Sanity](https://sanity.io/manage), [Cloudinary](https://cloudinary.com/console) and [Resend](https://resend.com) (Google Analytics optional)

### Install and run

```bash
git clone https://github.com/dg-dana/traveliga.git
cd traveliga
npm install

cp .env.example .env.local
# fill in the values described below

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To run the Sanity Studio locally:

```bash
npm run sanity      # serves the Studio on http://localhost:3333
```

The Studio's project ID (`7s19ept6`) and dataset (`production`) are configured in `sanity.config.ts` and `sanity.cli.js`.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production` |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | Yes | Deployed Studio URL |
| `SANITY_API_TOKEN` | For writes | Used by the seed script and write operations |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Yes | Server-side Cloudinary uploads |
| `RESEND_API_KEY` | Yes | Sending contact emails |
| `CONTACT_TO_EMAIL` | Yes | Inbox that `/api/contact` delivers submissions to (falls back to a hard-coded address if unset) |
| `RESEND_FROM_EMAIL` | Yes | Verified sender address used by the `lib/email/` helpers |
| `CONTACT_EMAIL` | Yes | Public contact address shown in structured data and email templates |
| `SANITY_WEBHOOK_SECRET` | Yes | HMAC secret for `/api/revalidate` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 (loads only after consent) |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site URL for metadata and Studio previews (defaults to `https://traveliga.com`) |
| `ALLOWED_ORIGINS` | Optional | Comma-separated CORS allowlist for API routes |
| `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX_REQUESTS` | Optional | Override the defaults (60s / 100 requests) |

Never commit `.env*` files — they are already ignored by `.gitignore`.

---

## Available scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` | Prettier over the repo |
| `npm run clean` | Remove `.next`, `out` and the Next.js cache |
| `npm test` / `npm run test:watch` / `npm run test:coverage` | Jest test suite |
| `npm run a11y` / `npm run a11y:ci` | Automated accessibility checks |
| `npm run lighthouse` / `npm run lighthouse:build` | Lighthouse audits |
| `npm run analyze` | Build with the bundle analyzer enabled |
| `npm run sanity` / `sanity:build` / `sanity:deploy` | Run, build and deploy the Studio |
| `npm run seed` | Seed the dataset with sample content (`scripts/seedContent.ts`) |
| `npm run verify:deployment` | Pre-deployment environment/config verification |
| `npm run predeploy` | `verify:deployment` followed by `build` |

---

## Project structure

```
app/                  Next.js App Router routes, layout, API handlers, sitemap/robots
components/           UI components (Navigation, Hero, galleries, ContactForm, a11y widget, …)
  home/               Homepage sections
lib/
  sanity/             Client, GROQ queries, image builder, Portable Text components, types
  cloudinary/         Upload and transformation helpers
  email/              Resend sender and React Email templates
  seo/                Metadata and structured-data helpers
  analytics/          GA event helpers
  a11y/               Reduced-motion hook
  utils/              RTL helpers
  api/security.ts     Same-origin checks for route handlers
  consent.ts          Cookie-consent state
sanity/               Studio schemas, desk structure, workflows, client, sample data, docs
scripts/              Seeding, deployment verification, Lighthouse, a11y, logo optimization
tests/                Jest + Testing Library specs
content/              Sample JSON content used by the seed script
docs/                 Deployment, testing, SEO, maintenance and handoff guides
proxy.ts              Rate limiting, CORS and fallback security headers
```

---

## Content management

All site content is authored in the Sanity Studio. Schemas live in `sanity/schemas/`:

- `article` / `post` — blog content (Portable Text via `blockContent`)
- `photo`, `video` — gallery items
- `testimonial` — customer recommendations, gated by the review workflow
- `author`, `category` — references
- `siteSettings` — contact details, WhatsApp number, social links, "Meet Meital" section

Publishing flow:

1. Edit and publish in the Studio.
2. A Sanity webhook calls `POST /api/revalidate` with an HMAC signature.
3. The handler verifies the signature against `SANITY_WEBHOOK_SECRET` and revalidates the affected paths.

To load sample content into a fresh dataset, set `SANITY_API_TOKEN` and run `npm run seed`. See [CONTENT_SEED_GUIDE.md](CONTENT_SEED_GUIDE.md) and [`sanity/docs/`](sanity/docs/) for editor-facing guides.

---

## Testing and quality checks

```bash
npm test              # Jest (tests/**/*.test.tsx)
npm run type-check    # TypeScript
npm run lint          # ESLint
npm run a11y          # Accessibility checks
npm run lighthouse    # Performance/SEO audit against a running build
```

Coverage is collected from `components/` and `app/`. Target Lighthouse scores are documented in [docs/performance-checklist.md](docs/performance-checklist.md) (Performance 90+, Accessibility 95+, SEO 95+).

---

## Accessibility and privacy

The site targets WCAG 2.1 AA / Israeli Standard 5568:

- Skip-to-content link and a keyboard-reachable `main` landmark
- Accessibility widget for text scaling, high contrast and reduced motion; preferences persist in `localStorage` and are applied before first paint to avoid flashes
- All Framer Motion animation is wrapped in `MotionProvider`, which honours the OS and widget reduced-motion settings
- A published accessibility statement at `/accessibility`

Analytics only load after the visitor accepts analytics cookies in the consent banner; the choice can be changed again from the cookie settings control. See [docs/accessibility-checklist.md](docs/accessibility-checklist.md).

---

## Deployment

Vercel is the recommended target (automatic HTTPS, GitHub integration, edge network).

```bash
npm run predeploy     # verifies env/config, then builds
```

1. Push to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Add every environment variable from the table above to the Production environment.
4. Deploy, then point the Sanity webhook at `https://<your-domain>/api/revalidate`.
5. Deploy the Studio with `npm run sanity:deploy`.

Detailed walkthroughs: [docs/DEPLOYMENT_QUICK_START.md](docs/DEPLOYMENT_QUICK_START.md) (Hebrew) and [docs/deployment-guide.md](docs/deployment-guide.md).

---

## Further documentation

**Service setup**

- [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md) — Google Analytics 4
- [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) — image hosting and optimization
- [EMAIL_SETUP.md](EMAIL_SETUP.md) — Resend configuration and domain verification
- [CONTENT_SEED_GUIDE.md](CONTENT_SEED_GUIDE.md) — seeding sample content

**Operations and handoff** — see [docs/README.md](docs/README.md) for the full index, including the deployment guides, [testing checklist](docs/testing-checklist.md), [device testing guide](docs/device-testing-guide.md), [SEO submission guide](docs/seo-submission-guide.md), [maintenance guide](docs/maintenance-guide.md), [post-launch checklist](docs/post-launch-checklist.md) and [client handoff](docs/client-handoff.md).

**Studio guides** — [sanity/docs/](sanity/docs/) covers adding articles, managing galleries, testimonials and troubleshooting.
