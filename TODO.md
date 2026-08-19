# Traveliga — TODO

Running list of open work on this project. Kept up to date by the `todo_update` skill; read with `todo_next`.

- [ ] Buy a real domain for Traveliga (currently using `traveliga.com` as a placeholder in metadata, `.env`, and Sanity `siteSettings.email`). Once purchased, update:
  - `NEXT_PUBLIC_SITE_URL`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`, `CONTACT_TO_EMAIL` in the Vercel/`.env` environment
  - Sanity `siteSettings.email`
  - Point the Vercel project's domain settings and Resend's domain verification at it
- [ ] Merge PR #14 (docs handoff update — README status section, resolved-report banners): https://github.com/dg-dana/traveliga/pull/14
- [ ] Re-enable Vercel deployment protection (Vercel Authentication) once QA is fully done — it was deliberately disabled for the QA passes and the site is currently public
