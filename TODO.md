# Traveliga — TODO

Running list of open work on this project. Kept up to date by the `todo_update` skill; read with `todo_next`.

- [ ] Fix the video section — `getEmbedUrl` in `components/VideoGallery.tsx` only handles `youtube.com/watch?v=`, `youtu.be/`, and `vimeo.com/ID`; other common URLs (YouTube Shorts/embed/live, `m.youtube.com`, Vimeo private links) silently render a broken `embed/undefined` iframe. Make URL parsing robust, fall back gracefully when a URL can't be embedded, and wire up the existing `trackVideoPlay` analytics.
- [ ] Reword the Home button — review/fix the wording of the "home" nav item (`דף הבית` in `components/Navigation.tsx`).
- [ ] Make Hebrew the first/default language on the home (opening) page — `OpeningPage` in `components/opening/OpeningPage.tsx` currently defaults to `en` (`useState<Lang>("en")`); default to `he` so the landing page opens in Hebrew (localStorage still overrides for returning visitors).
- [ ] Buy a real domain for Traveliga (currently using `traveliga.com` as a placeholder in metadata, `.env`, and Sanity `siteSettings.email`). Once purchased, update:
  - `NEXT_PUBLIC_SITE_URL`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`, `CONTACT_TO_EMAIL` in the Vercel/`.env` environment
  - Sanity `siteSettings.email`
  - Point the Vercel project's domain settings and Resend's domain verification at it
- [ ] Re-enable Vercel deployment protection (Vercel Authentication) once QA is fully done — it was deliberately disabled for the QA passes and the site is currently public
- [ ] Delete merged branches on GitHub that couldn't be auto-deleted (repo-settings writes are blocked for this session): `claude/docs-status-update`, `claude/add-todo-skills`
