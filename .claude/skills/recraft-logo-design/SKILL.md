---
name: recraft-logo-design
description: Use when designing or refining the Liga Deals Berlin logo/icon assets with Recraft AI - covers the brand spec, account limits, prompting workflow, and known gotchas from past sessions. Trigger on "Recraft," "logo," or requests to generate/refine icon assets for this project.
---

# Recraft AI — Liga Deals Berlin logo workflow

Working notes from live sessions designing the Liga Deals Berlin logo. Paste this whole file into a new chat (Claude, Recraft's own assistant, wherever) to get instant context instead of re-explaining from scratch.

## Brand spec

- **Name:** Liga Deals Berlin — Hebrew/RTL Berlin travel guide for Israelis
- **Palette (exact hex, flat only — no gradients):**
  - Navy `#282f57` (primary), `#0d0f1f` (deep/900), `#161a33` (surface/800)
  - Gold `#d9a441` (primary), `#e0b34c` (highlight/400)
- **Current chosen directions** (from a Recraft batch that beat both Gemini and ChatGPT's image tool):
  1. **"LD" interlocked monogram** — primary mark. Matched stroke weight on both letters, no thin/thick mismatch.
  2. **Fernsehturm (TV tower) silhouette badge** — secondary/accent mark. Antenna, collar-banded sphere, tapered shaft, centered in a circle with generous even padding.
- **Sizes the site actually needs** (`public/`):
  - `ligadeals-logo.png` — 400×480 (OG image / featured fallback)
  - `ligadeals-logo-small.png` — 60×72 (nav bar, rendered at 44px)
  - `ligadeals-logo-hero.png` — 200×240 (blog/gallery pages)
- Nav already renders "Liga Deals Berlin" as real HTML text next to the icon (`components/Navigation.tsx`) — the icon does **not** need to carry the wordmark. Favor icon-only marks over badges with baked-in type.

## Account limits (free tier — check before shipping anything)

- 30 generation credits/day, 3 image imports/day, both reset daily
- **No commercial usage rights on the free plan.** Anything meant to actually ship to the live site requires upgrading to a paid tier first — don't treat free-tier output as final.

## Recommended tool order

Don't just generate and stop — Recraft's other tools fix problems generation alone won't:

1. **Style creation** — lock a style profile from the winning LD/tower generations *before* making more variants, so new generations stay visually consistent instead of drifting in weight/detail each time.
2. **Generate** against that locked style for any remaining variants.
3. **Background remover** — run explicitly on the final pick. Don't trust a prompt asking for "transparent background" — every generator so far (Gemini, GPT, Recraft) has handed back a flat white/checkerboard-baked image instead of real alpha.
4. **Vectorizer** — run last, on the finished raster, to get real SVG paths. This is what makes future recolors/resizes/exports clean instead of another generation gamble.

## Prompt template (adapt per mark)

```
Vector icon logo: [describe the specific shape/letterforms/silhouette].
Flat fill, no gradients, no shadows, no bevels.
Two-color palette only: navy #282f57 and gold #d9a441 —
gold [mark] on a navy circular badge, generous even padding on all sides
so it isn't cropped by the circle edge.
Deliver as clean scalable vector (SVG), with a standalone transparent-background
version (no circle) as well as the circular badge version.
Must stay legible/recognizable when scaled down to 24px.
```

Specific fixes that worked when iterating:
- Monogram with mismatched letter weights → ask explicitly for "matched, consistent stroke weight between both letters."
- Tower cropped/crowding the circle edge → ask explicitly to scale down ~15-20% with even padding top/bottom/sides.

## Verification checklist before any asset goes in `public/`

1. **Real alpha, not baked-in checkerboard** — verify with PIL (`im.convert('RGBA').getchannel('A').getextrema()` should show a real 0–255 range, and corner pixels should be genuinely transparent, not a checkerboard pattern drawn into the pixels).
2. **Exact hex, not "close enough"** — every generator drifts from `#282f57`/`#d9a441`. Flatten to the exact brand hex after generation, don't ship AI-drifted color.
3. **Scales down cleanly** — check the mark at actual favicon (16-32px) and nav (44px) sizes, not just the full-size render.
4. **Commercial rights secured** — confirm paid plan before using output in production.

## Open decisions (update as they're resolved)

- [ ] Confirm LD-primary / tower-secondary role split (or reconsider)
- [ ] Upgrade Recraft plan for commercial rights
- [ ] Get final files off Recraft (need real file paths/downloads, not just chat-rendered previews, before Claude can process them)
