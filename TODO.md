# Traveliga — TODO

Running list of open work on this project. Kept up to date by the `todo_update` skill; read with `todo_next`.

- [ ] Make the Berlin guide's Sanity content switch with the he/en toggle. Right now the toggle only swaps the UI chrome/copy (`lib/i18n/berlin.ts`); article titles/excerpts and any guide body pulled from Sanity stay in their original (Hebrew) language. Needs bilingual fields in the Sanity schema + the `LanguageContext` wired to select the matching language when rendering `BerlinFeatured` (and future guide content).
- [ ] Traveliga Berlin guide — he/en bilingual support
- [ ] Traveliga dark mode
- [ ] Traveliga video section
- [ ] Buy a real domain for Traveliga (currently using `traveliga.com` as a placeholder in metadata, `.env`, and Sanity `siteSettings.email`). Once purchased, update:
  - `NEXT_PUBLIC_SITE_URL`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`, `CONTACT_TO_EMAIL` in the Vercel/`.env` environment
  - Sanity `siteSettings.email`
  - Point the Vercel project's domain settings and Resend's domain verification at it
- [ ] Re-enable Vercel deployment protection (Vercel Authentication) once QA is fully done — it was deliberately disabled for the QA passes and the site is currently public
- [ ] Delete merged branches on GitHub that couldn't be auto-deleted (repo-settings writes are blocked for this session): `claude/docs-status-update`, `claude/add-todo-skills`
