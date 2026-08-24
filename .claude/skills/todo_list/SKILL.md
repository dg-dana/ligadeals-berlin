---
name: todo_list
description: Shows the whole of this repo's TODO.md as a short TL;DR list of bullet points — for when the user asks to "show the todo list", "what's on the todo", "list everything left", "give me the tldr of what's open on Traveliga", or similar. Read-only: it never edits TODO.md (use todo_update for that). Unlike todo_next, which reports only the single next item, this gives the full list — but compressed to one tight line each, not a dump of the file's prose.
---

# todo_list

Show everything that's still open, as a scannable TL;DR — one line per item, not the file's full prose.

## How to run this

1. Read `TODO.md` at the repo root.
2. Take **every** unchecked (`- [ ]`) item, in the order they appear (the file is kept with the most important / next-actionable item first, so preserve that order).
3. Reply as a plain bullet list, one bullet per item. Compress each to a single short line — the essence of the task, dropping the surrounding context (PR links, file paths, env var names, rationale) unless a detail is what makes the item recognizable. The goal is a quick scan of what's left, not a rewrite of the file.
4. If `TODO.md` is empty or every item is checked off, say the list is clear rather than inventing items.

Don't edit the file here, even if something in it looks stale or wrong while reading — that's `todo_update`'s job. If something looks off, mention it briefly after the list, but don't fix it as a side effect of this skill.

Keep it to the TL;DR. If the user wants the full context behind an item, they'll ask or open the file; for just the single next thing to do, that's `todo_next`.

## Example

TODO.md contains:
```
- [ ] Buy a real domain for Traveliga — right now traveliga.com is a placeholder in metadata, .env, and Sanity site settings.
- [ ] Merge PR #14 (checkout flow fixes) once review is done.
- [ ] Re-enable Vercel deployment protection after the demo.
```

Reply:
> **TL;DR — what's left on Traveliga:**
> - Buy a real domain (traveliga.com is still a placeholder)
> - Merge PR #14 (checkout flow) after review
> - Re-enable Vercel deployment protection post-demo
