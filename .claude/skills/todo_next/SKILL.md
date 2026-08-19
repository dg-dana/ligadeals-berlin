---
name: todo_next
description: Reports just the single next open item from this repo's TODO.md — for when the user asks "what's next", "what should I work on now", "what's left on the todo list", "what's the next thing to do on Traveliga", or similar. Read-only: it never edits TODO.md (use todo_update for that). Keep the reply short — the next item plus a line of context, not a dump of the whole file.
---

# todo_next

Answer "what's next" with the top of the list, not the whole list.

## How to run this

1. Read `TODO.md` at the repo root.
2. Take the **first** unchecked (`- [ ]`) item — that's the front of the queue, since `todo_update` keeps the file ordered with the most important/next-actionable item first.
3. Reply with just that item, in plain language, plus at most a sentence of the essential context already in the file (a PR link, an env var name, why it matters) if it has any. Don't restate or summarize the rest of the list — if the user wants the full picture they'll ask for it or open the file themselves.
4. If `TODO.md` is empty or every item is checked off, say so plainly rather than inventing something to report.

Don't edit the file here, even if you notice something in it looks stale or wrong while reading — that's `todo_update`'s job. If something looks off, mention it briefly after answering, but don't fix it as a side effect of this skill.

## Example

TODO.md contains:
```
- [ ] Buy a real domain for Traveliga...
- [ ] Merge PR #14...
- [ ] Re-enable Vercel deployment protection...
```

Reply: "Next up: buy a real domain for Traveliga — right now `traveliga.com` is just a placeholder used in metadata, `.env`, and Sanity's site settings."
