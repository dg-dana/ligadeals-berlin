# Traveliga follow-up QA report

Date: 2026-08-19  
Site: `https://traveliga-dana20.vercel.app`  
Repository: `master`

## Executive summary

The previous rebrand findings are fixed:

- The deployment is public and no longer redirects to a Vercel login wall.
- Global rendered text uses `Traveliga` and `info@traveliga.com`.
- The two previously affected article SEO titles now end with `| Traveliga`.
- All four discovered individual blog posts render successfully.
- No duplicate `Traveliga | Traveliga` title suffixes were found.
- A broad published-Sanity-content scan returned zero legacy-brand matches.

Three new issues remain:

1. The sitemap advertises `/gallery` and individual photo/video URLs that return 404 pages.
2. The sitemap contains `/blog/category/restaurants` twice.
3. Blog article pages inherit generic Twitter title/description metadata instead of article-specific values.

## Routes checked

Rendered text, page title, descriptions, Open Graph tags, Twitter tags, image alt text, shared footer, logo, and favicon references were checked on:

- `/`, `/about`, `/blog`
- `/gallery/photos`, `/gallery/videos`, `/recommendations`
- `/privacy`, `/terms`, `/accessibility`, `/contact`
- `/blog/berlin-august-events-guide`
- `/blog/berlin-best-sunset-spots`
- `/blog/kottbusser-tor-kotti-guide`
- `/blog/fernsehturm-alexanderplatz-history`

All listed routes returned the expected page rather than a login screen or 404.

## Findings

### [P1] Sitemap advertises nonexistent gallery routes

User-facing impact: links from search engines or other sitemap consumers lead to 404 pages.

The live sitemap includes:

```text
https://traveliga.com/gallery
https://traveliga.com/gallery/photos/29602502-9d57-4556-b25c-8c5092aafd7b
https://traveliga.com/gallery/videos/025159aa-677c-40fa-b5a3-bf8e140d25fc
```

Equivalent routes on the tested deployment returned:

```text
404: This page could not be found.
```

Repository context:

- `app/sitemap.ts:90-105` adds `/gallery`, although no `/gallery/page.tsx` route exists.
- `app/sitemap.ts:130-144` generates individual photo/video URLs, although no dynamic `[id]` page routes exist.

Recommended fix: remove nonexistent URLs from the sitemap until the corresponding pages are implemented, or implement those routes.

### [P2] Duplicate category URL in sitemap

Backend/SEO-facing issue; it creates duplicate sitemap entries.

The live `/sitemap.xml` contains this URL twice:

```text
https://traveliga.com/blog/category/restaurants
```

Repository context: `app/sitemap.ts:120-128` maps all Sanity categories directly and does not de-duplicate URLs.

Fix by de-duplicating category URLs before returning the sitemap, or remove the duplicate Sanity category record if it is unintended.

### [P2] Article Twitter cards use generic site metadata

User-facing metadata issue on:

- `/blog/berlin-august-events-guide`
- `/blog/berlin-best-sunset-spots`
- `/blog/kottbusser-tor-kotti-guide`
- `/blog/fernsehturm-alexanderplatz-history`

Observed on every article page:

```text
twitter:title: Traveliga
twitter:description: המדריך המקיף לחיים בברלין - טיפים, מדריכים, ותוכן איכותי בעברית
```

The HTML `<title>`, meta description, and Open Graph title/description are article-specific, but Twitter metadata falls back to root layout defaults.

Repository context:

- `app/blog/[slug]/page.tsx:59-65` returns article title/description and Open Graph data but no `twitter` object.
- `lib/seo/metadata.ts:79-84` defines the generic root Twitter metadata.

Fix by adding article-specific Twitter metadata in `app/blog/[slug]/page.tsx`, using the article title, description, image, and `creator: '@traveliga'`.

## Rebrand verification — clean

### Rendered pages

No old-brand terms were found in rendered text, page titles, descriptions, Open Graph tags, Twitter tags, or image alt text on any checked route.

The previously affected titles now render as:

```text
אירועים בברלין באוגוסט: המדריך למשפחות ולמבוגרים | Traveliga
שקיעות בברלין: המקומות הכי יפים לסוף היום | Traveliga
```

No title contained a duplicated suffix such as `Traveliga | Traveliga`.

### Sanity CMS

A broad scan of all published Sanity documents and free-text fields—including articles, SEO fields, categories, authors, testimonials, site settings, photo/video fields, captions, descriptions, and Portable Text—returned:

```text
0 legacy-brand matches
```

Verified site settings:

```text
siteName: Traveliga
email: info@traveliga.com
```

The seven previously unapproved testimonials contain no old-brand text and remain unapproved.

### Repository search

The repository-wide search found matches only in `CLAUDE_CODE_FIX_REPORT.md`, where the old terms are intentionally quoted as test patterns and historical findings:

- Lines `7-12`, `24-25`, `47-84`, and `94`.

No matches were found in application code, Sanity schemas, content data, configuration, public assets, or email templates.

### Static endpoints

All three endpoints are public and return the correct content type:

- `/sitemap.xml` — `application/xml`
- `/robots.txt` — `text/plain`
- `/manifest.json` — `application/json`

They contain no old-brand strings. Their canonical references correctly use `https://traveliga.com`.

### Logo, favicon, and alt text

The navigation renders `traveliga-mark.svg` with adjacent visible `Traveliga` text. Favicon and manifest references use the Traveliga asset set. Content images use article/photo/video titles or captions for alt text; decorative logo/hero images use empty alt text.

### Contact form

The live form renders the expected fields and privacy-consent checkbox. No real submission was performed.

Repository path:

- `components/ContactForm.tsx:31-62` — POST to `/api/contact`
- `components/ContactForm.tsx:271-274` — success message: `ההודעה נשלחה בהצלחה! נחזור אליך בהקדם`

## Recommended fix order

1. Remove or implement the nonexistent sitemap gallery URLs.
2. De-duplicate category URLs in the sitemap.
3. Add article-specific Twitter metadata.
4. Re-run the route, metadata, endpoint, CMS, and repository searches.

