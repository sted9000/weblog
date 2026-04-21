---
description: Review a pending link post against link-blog principles before publishing
argument-hint: [path]
allowed-tools: Read, WebFetch, Edit, Bash(stat:*), Bash(ls:*), Bash(git status:*), Bash(git diff:*)
---

Critique a link-blog post so it's ready to publish. Raw args: `$ARGUMENTS`

## Pick the target

- If `$1` is a path to an existing file under `src/content/links/`, use that.
- Otherwise, find the most recently modified `.md` under `src/content/links/`:
  ```
  stat -f "%m %N" src/content/links/*.md 2>/dev/null | sort -rn | head -1
  ```
  Confirm in one line which file you're reviewing. If the file is already committed (check `git status --short` — not listed as modified/untracked), say so and ask whether to review it anyway.
- If there are no link files, stop.

## Read the post and its source

1. Read the target file in full — frontmatter and body.
2. `WebFetch` the `url` from the frontmatter. Ask for: a short summary, the key ideas, the author names (byline/about page/meta), any notable quotable lines, and whether the page includes a video or significant visuals. If the fetch fails, note it and carry on with just the post text.

## Critique against Ted's link-blog principles

Evaluate each item below. For each, state either **OK** (with one line of why) or **Suggest** (with a concrete, actionable fix — not vague advice). Skip items that clearly don't apply (e.g. transcript quotes for a text post) and say so.

1. **Author credit.** Is `authors` populated in frontmatter? If the source clearly names author(s) and the post doesn't, propose the exact `authors:` block to add. Distinguish the *publisher* (e.g. "Lenny's Podcast") from the *author/speaker* (e.g. "Keith Rabois") — prefer individual humans; list both if both are meaningful.
2. **Value-add commentary.** Does the body offer Ted's own take, context, or connection — not just a summary? A bare description + quote with no commentary is a **Suggest**. Propose 1–3 sentences Ted could add, drawn from what's actually in the post; never fabricate an opinion he didn't express.
3. **Standalone value.** Would a reader get something useful *without* clicking through? If the post is entirely "here's a link, it's good," suggest a specific idea from the source worth capturing as backup against link rot.
4. **Proof of reading.** Is there a specific detail — a name, a number, a turn of phrase — that shows Ted read past the headline? If not, point to a concrete detail from the source he could weave in.
5. **Quotations.** If the body quotes the source, are quotes formatted as markdown blockquotes (`> ...`)? For attributed quotes, is the attribution line `> — <cite>Name</cite>`? Flag any quote that's paraphrased-in-quotes or missing attribution when the speaker matters.
6. **Tags.** Is `tags` empty or sparse? Suggest 2–5 tags based on the content. Check `src/content/links/*.md` for existing tag conventions (look at a handful of recent files) — prefer reusing an existing tag over inventing a near-duplicate (e.g. don't add `ai-agents` if `agents` is already common). Call out any person linked 3+ times as a candidate for a dedicated person-tag.
7. **Related prior posts.** Grep `src/content/links/` and `src/content/blog/` for overlapping topics/authors. If you find 1–2 genuinely related prior posts, suggest a "see also" sentence with a relative link. Do not force connections that aren't there.
8. **Visuals.** If the source has a meaningful screenshot-worthy visual (a UI, a chart, a video frame) and the post has no image, suggest running `/photo` to add one. If it's a video/podcast, suggest quoting a transcript snippet.
9. **Code links.** If the post is about code/a repo, is there a direct link to the relevant snippet (ideally pinned to a commit via GitHub's permalink)? Suggest if missing.
10. **Tone check.** If the original author read this, would they feel good about it? Flag anything that reads as dismissive, condescending, or like it's taking credit for the author's ideas.
11. **Mechanics.** Typos, broken markdown, frontmatter schema issues (required: `title`, `date`, `url`; optional: `description`, `tags`, `authors`, `via`). Dates use `YYYY-MM-DD`. YAML strings with `"` inside need escaping. Image paths must start with `/weblog/images/` (the site's base path).

## Report

Print a compact review with two sections:

```
## Review: <filename>

### Looks good
- <item>: <one-liner>

### Suggestions
- <item>: <concrete fix>
```

Then ask: **"Want me to apply any of these? Say which (e.g. 'all', '1,3,6', or 'skip')."**

## Applying fixes

- If the user picks specific items, apply exactly those with `Edit` — one edit per item, narrow scope.
- Never rewrite Ted's prose wholesale. Preserve his voice — typos in quoted material, informal phrasing, and stylistic choices stay. Only fix what was explicitly requested.
- For `authors`, `tags`, and other frontmatter, edit the YAML block directly. Keep the frontmatter field order from `/link-new`: `title`, `date`, `tags`, `description`, `url`, `authors`, `via`.
- After applying, print a one-line diff summary per change. Do not commit or push — that's `/link-publish`.

## Notes

- Be direct but not preachy. One suggestion per item, not a lecture.
- Don't invent facts about the source. If the `WebFetch` didn't surface an author, say "couldn't confirm author from the page" rather than guessing.
- Don't suggest changes that contradict an explicit choice Ted already made (e.g. if he intentionally left `description` off, don't nag).
- If the post looks ready as-is, say so plainly and skip the suggestions section.
