---
name: todo_update
description: Refreshes this repo's TODO.md so it stays an accurate, short list of what's actually still open on the Traveliga project. Use this whenever a piece of work just got finished (a PR merged, a bug fixed, a rename/setup step done, a domain purchased, deployment protection toggled) or whenever new work surfaces that should be tracked — not just when the user says the word "todo". Also use it if the user asks to "update the todo list", "mark X as done", "add X to the list", or "clean up the todo file". This is the write path — it edits TODO.md. For just reading the next item without changing anything, use todo_next instead.
---

# todo_update

`TODO.md` at the repo root is the single source of truth for what's left to do on this project, meant to survive across chat sessions and context resets — a fresh session with no memory of past conversations should be able to read it and know exactly where things stand. That's only true if it's kept current, so update it proactively whenever the state of the world changes, not just when explicitly asked.

## When to run this

Trigger yourself (don't wait to be asked) right after:
- Merging a PR, especially one that closes out something TODO.md mentions
- Fixing a bug, finishing a QA pass, or completing a setup/config step (domain, deployment protection, env vars, service renames, etc.)
- Discovering new work that should be tracked (a QA report surfaces a new issue, the user mentions something still needs doing, a follow-up task gets created)

And whenever the user explicitly asks to update, add to, or clean up the list.

## How to update it

1. **Read the current `TODO.md`.**
2. **Figure out what actually changed.** Pull from whatever's available and relevant:
   - Recent conversation context — what did this session just finish or discover?
   - `git log --oneline -15` and `git log <base>..HEAD` for recent commits
   - Open/merged PRs (`gh pr list --state all --limit 10` or the GitHub MCP tools if connected) — a TODO item referencing a specific PR number is done once that PR is merged
   - Current repo/service state if a todo item depends on it (e.g. check whether a `.env` var or Sanity field mentioned in an item has actually been changed)
3. **Rewrite the file**, not just append to it:
   - Remove items that are now done. Don't leave a trail of `[x]` checked-off history in this file — TODO.md is a live "what's left" list, not a changelog. (Git history and the PRs themselves are the record of what happened.)
   - Add newly-surfaced open items, phrased the same concise way as existing ones — a short bullet, with a line or two of essential context (file paths, PR numbers, env var names) only if that context is what makes the item actionable later.
   - Keep the most important / next-actionable item first. If you're not sure what's most important, keep the existing order unless something clearly jumped the queue (e.g. a blocker).
   - Keep the format plain: `- [ ] item` checklist bullets, no headers beyond the title, no restating finished work.
4. **Actually save the file.** This skill's job is to leave `TODO.md` correct on disk — don't just describe what should change and stop there.
5. Briefly tell the user what changed (what got removed, what got added) rather than dumping the whole file back at them — they can open it themselves if they want the full contents.

## A note on judgment

Don't blindly remove an item just because related work happened — confirm it's actually resolved (e.g. a PR that touches the same file isn't automatically the PR that closes the todo item; check what it actually did). Conversely, don't leave stale items sitting around out of caution once you have good evidence they're done. When genuinely unsure whether something is finished, it's fine to leave it and note the uncertainty to the user rather than guessing.
