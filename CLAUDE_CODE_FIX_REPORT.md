# Traveliga rebrand cleanup — Claude Code fix report

## Objective

Remove every remaining trace of the former brand from the Traveliga website and Sanity CMS:

- `Liga Deals Berlin`
- `LigaDeals`
- `ligadeals`
- `ליגה דילס`
- `ליגהדילס`
- `ligadeals-berlin.com`

The repository search on `master` found no legacy-brand matches. The remaining issues are in Sanity content and must be fixed in the CMS, followed by a deployment verification.

## Required fixes — user-facing

### 1. Update global site settings in Sanity

Open the published `siteSettings` document and change:

| Field | Current value | Required value |
|---|---|---|
| `siteName` | `Liga Deals Berlin` | `Traveliga` |
| `email` | `info@ligadeals-berlin.com` | `info@traveliga.com` |

The email is rendered through the shared layout/footer and contact-related pages, including:

- `/`
- `/about`
- `/blog`
- `/gallery/photos`
- `/gallery/videos`
- `/recommendations`
- `/contact`
- `/privacy`
- `/accessibility`
- individual blog pages

Confirm the new email is also correct in any Sanity preview or site-settings UI.

### 2. Update article SEO title: August events guide

Sanity article:

- Slug: `berlin-august-events-guide`
- Current `seo.metaTitle`: `אירועים בברלין באוגוסט: המדריך למשפחות ולמבוגרים | ליגה דילס`

Replace it with:

```text
אירועים בברלין באוגוסט: המדריך למשפחות ולמבוגרים | Traveliga
```

Verify that the article’s generated `<title>`, `og:title`, and Twitter title update after publishing.

### 3. Update article SEO title: sunset guide

Sanity article:

- Slug: `berlin-best-sunset-spots`
- Current `seo.metaTitle`: `שקיעות בברלין: המקומות הכי יפים לסוף היום | ליגה דילס`

Replace it with:

```text
שקיעות בברלין: המקומות הכי יפים לסוף היום | Traveliga
```

Verify that the article’s generated `<title>`, `og:title`, and Twitter title update after publishing.

## Required fixes — CMS records currently backend-only

Seven testimonial documents contain `ליגה דילס`. They currently have `status: null`, so the application’s public query does not render them. They must still be cleaned so the legacy brand cannot reappear if the records are approved later.

Replace `ליגה דילס` with `Traveliga` in these records:

1. `שרה לוי` — `טיול רומנטי בלתי נשכח! הזמנו דרך ליגה דילס...`
2. `מיכל גולדשטיין` — `ליגה דילס טיפלו בכל הפרטים הקטנים...`
3. `רחל בן דוד` — `טיול משפחתי נפלא עם ליגה דילס!`
4. `עמית שפירא` — `ליגה דילס מצאו לי דירת Airbnb...`
5. `דוד כהן` — `ליגה דילס עזרו לנו לארגן הכל בצורה מושלמת...`
6. `יוסי אברהם` — `ליגה דילס הפכו את הכל לפשוט וקל!`
7. `אלון רוזנברג` — `ליגה דילס סידרו לנו את החלק הברלינאי...`

Do not approve or feature these records as part of this task unless that is separately requested. This task is only to remove legacy naming.

## Code and configuration checks

The repository already passed the legacy-string search, but keep these checks in place:

```bash
rg -n -i --hidden --glob '!.git/**' \
  'ligadeals|liga deals|liga-deals|ליגה דילס|ליגהדילס|ligadeals-berlin\.com' .
```

Expected result: no matches.

Also verify that these remain Traveliga-branded:

- `public/manifest.json`
- favicon and Apple touch icon references
- `public/traveliga-*` logo assets
- metadata helper and Open Graph/Twitter defaults
- footer, navigation, contact form, privacy, terms, and accessibility pages

## Deployment blocker to resolve

The supplied deployment currently redirects to Vercel’s protected-deployment login. As a result, these checks could not be completed against rendered production pages:

- navigation and footer traversal
- rendered page text
- page titles and meta tags
- image alt text and logo rendering
- contact-form confirmation in the browser
- direct production contents of `/sitemap.xml`, `/robots.txt`, and `/manifest.json`

After fixing the CMS, either temporarily make the deployment publicly readable or provide an authenticated QA route/session. Do not treat Vercel’s login HTML as valid output for those endpoints.

## Verification checklist after the fix

1. Publish the Sanity changes.
2. Trigger or wait for the site’s Sanity revalidation.
3. Search all published Sanity documents again for every legacy variant listed above.
4. Visit every navigation/footer route and read the rendered text.
5. Check `<title>`, meta description, `og:title`, `og:description`, Twitter title, and Twitter description on every page.
6. Check individual blog pages, especially:
   - `/blog/berlin-august-events-guide`
   - `/blog/berlin-best-sunset-spots`
7. Check the global footer/contact email on all shared-layout pages.
8. Check image alt text, logo, favicon, and manifest branding.
9. Confirm `/sitemap.xml` is XML, `/robots.txt` is plain text, and `/manifest.json` is JSON—not Vercel login HTML.
10. Inspect the contact form flow without submitting real personal data unless an approved test inbox is available.
11. Run the repository-wide `rg` command above and attach the zero-match result to the final QA note.

## Acceptance criteria

The fix is complete only when:

- No legacy-brand variant remains in published CMS content or repository files.
- No user-facing page, SEO metadata, social card, email address, logo, favicon, manifest, sitemap, or robots output contains the former brand.
- The protected-deployment issue is resolved or explicitly documented as the only remaining verification blocker.

