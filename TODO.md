# Traveliga — TODO

Running list of open work on this project. Kept up to date by the `todo_update` skill; read with `todo_next`.

- [ ] Berlin guide bilingual — finish rollout. Code is done: `titleEn`/`excerptEn` (article) + `titleEn` (category) schema fields, GROQ projection, and `BerlinFeatured` selecting per the he/en toggle with Hebrew fallback. Remaining: deploy the Studio schema (`npm run sanity:deploy`) and author the English translations in Sanity so English mode shows more than the Hebrew fallback. Guide *body* (portable text) is still Hebrew-only — not yet bilingual.
- [ ] Traveliga dark mode
- [ ] Traveliga video section
- [ ] Buy a real domain for Traveliga (currently using `traveliga.com` as a placeholder in metadata, `.env`, and Sanity `siteSettings.email`). Once purchased, update:
  - `NEXT_PUBLIC_SITE_URL`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`, `CONTACT_TO_EMAIL` in the Vercel/`.env` environment
  - Sanity `siteSettings.email`
  - Point the Vercel project's domain settings and Resend's domain verification at it
- [ ] Re-enable Vercel deployment protection (Vercel Authentication) once QA is fully done — it was deliberately disabled for the QA passes and the site is currently public
- [ ] Delete merged branches on GitHub that couldn't be auto-deleted (repo-settings writes are blocked for this session): `claude/docs-status-update`, `claude/add-todo-skills`
