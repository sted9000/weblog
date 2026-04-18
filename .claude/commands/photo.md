---
description: Copy an image (clipboard or file) into public/images and print the markdown snippet
argument-hint: [path] [alt text]
allowed-tools: Bash(osascript:*), Bash(cp:*), Bash(stat:*), Bash(ls:*), Bash(file:*), Bash(mkdir:*), Bash(test:*), Bash(basename:*)
---

Add a photo to the site. Raw args: `$ARGUMENTS`

## Parse args

- If the first whitespace-delimited token is a path to a file that exists, that's the **source file**; the rest is **alt text**.
- Otherwise, there's no source file (pull from clipboard instead) and the whole argument string is **alt text**.
- Alt text may be empty — that's fine, leave it blank in the output.

## Determine target slug

Find the most recently modified `.md` file under `src/content/links/` and `src/content/blog/`:

```
stat -f "%m %N" src/content/links/*.md src/content/blog/*.md 2>/dev/null | sort -rn | head -1
```

Take the basename without `.md` — that's the **slug**. If no posts exist, stop and tell the user to create a post first.

## Get the image

**If source file provided:**
- Confirm it exists and is readable.
- Extension: lowercase the source extension (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`). If it's something else, stop and ask.

**If no source file (clipboard):**
- Extension: `.png`.
- Grab the clipboard image with:
  ```
  osascript -e 'set png to (the clipboard as «class PNGf»)' \
            -e 'set f to open for access POSIX file "<TARGET>" with write permission' \
            -e 'set eof f to 0' \
            -e 'write png to f' \
            -e 'close access f'
  ```
  where `<TARGET>` is the final path (see next step).
- If that fails, the clipboard isn't an image. Stop and tell the user to either copy an image to the clipboard or pass a file path.

## Target path & collisions

- Base: `public/images/<slug><ext>` (e.g. `public/images/2026-04-18-social-media-card-cropper.png`).
- If the base path already exists, append `-2`, `-3`, … before the extension until you find a free slot.
- For a file source: `cp <source> <target>`.
- For clipboard: write directly to `<target>` via the osascript block above.

## Print the snippet

Report back with:
1. The file that was written (relative path from repo root).
2. A ready-to-paste markdown line:
   ```
   ![<alt>](/weblog/images/<filename>)
   ```
   Note the `/weblog/` prefix — it's required because `astro.config.mjs` sets `base: '/weblog'`.
3. The target post file (the one whose slug was used), so the user knows where to paste it.

Do **not** edit the post file. The user pastes the snippet themselves.

## Notes

- Don't validate image dimensions or content — trust the source.
- Don't commit or push. That's what `/link-publish` is for.
- If the user passes a path that looks like a URL (starts with `http`), stop and say downloading remote images isn't supported yet.
