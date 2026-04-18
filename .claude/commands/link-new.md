---
description: Create a new link post from a URL with auto-filled metadata
argument-hint: <url>
allowed-tools: WebFetch, Write, Bash(date:*)
---

Create a new link-blog post for the URL: `$1`

## Steps

1. **Validate the URL.** If `$1` is empty or not a valid `http(s)://` URL, ask the user for one and stop.

2. **Fetch metadata.** Use `WebFetch` on the URL with a prompt like:
   > Return a JSON object with these keys, pulling from the page's `<title>`, meta tags, OG tags, and visible byline. Use `null` for anything you can't find. Do not invent values.
   > - `title`: the page title (prefer `og:title`, fall back to `<title>`)
   > - `description`: one-sentence summary (prefer `og:description`, fall back to `<meta name="description">`)
   > - `authors`: array of author names (from `<meta name="author">`, `article:author`, rel=author, or a clear byline). Empty array if none.
   > - `site_name`: `og:site_name` if present

   If the fetch fails or returns nothing useful, ask the user for the title and description before continuing.

3. **Build the filename.**
   - Today's date is provided in the environment context (`currentDate`). Use that in `YYYY-MM-DD` format. If absent, run `date +%Y-%m-%d`.
   - Slug: lowercase the title, replace any run of non-alphanumerics with a single `-`, trim leading/trailing `-`, cap at ~60 chars (don't break mid-word if avoidable).
   - Full path: `src/content/links/<YYYY-MM-DD>-<slug>.md`
   - If that path already exists, append `-2`, `-3`, etc.

4. **Write the file.** Frontmatter, in this order, omitting any optional field you couldn't populate (do **not** write empty strings or empty arrays for optional fields):

   ```
   ---
   title: "<title>"
   date: <YYYY-MM-DD>
   tags: []
   description: "<description>"
   url: "<url>"
   authors:
     - "<author>"
   quote: |

   ---


   ```

   Rules:
   - `title`, `date`, `url` are required by the schema — they must always be present.
   - `tags: []` stays empty for the user to fill.
   - `description` — include only if you found one.
   - `authors` — include only if you found at least one. Use YAML block-list form.
   - `quote` — always include as an empty block scalar (`quote: |` with a blank line) so the user can paste a quote in.
   - Leave the post body empty (two trailing newlines after the closing `---`).
   - Escape any `"` inside `title`/`description` by using single quotes on the outer YAML string, or backslash-escape.

5. **Report back.** Print:
   - The file path created
   - Which fields were auto-filled vs left blank
   - A one-line reminder: "Fill in tags, quote, and body, then run `/link-publish`."

## Notes
- Do not populate `via` — that's for a human referrer ("via @user") and should be added manually when relevant.
- Never invent an author or description. Blank is better than wrong.
