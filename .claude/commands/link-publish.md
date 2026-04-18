---
description: Commit and push pending link posts to deploy them
allowed-tools: Bash(git status:*), Bash(git add:*), Bash(git diff:*), Bash(git commit:*), Bash(git push:*), Bash(git log:*), Read
---

Publish pending link post(s) by committing and pushing to `main`. GitHub Actions will deploy.

## Steps

1. **Survey the working tree.** Run `git status --short` and `git diff --stat`.

2. **Find link changes.** Identify untracked or modified files under `src/content/links/`.
   - If there are none, tell the user "Nothing to publish in `src/content/links/`." and stop.

3. **Auto-include images.** Treat untracked or modified files under `public/images/` as part of the publish — stage them alongside the link files without asking. Photos belong with the link post that references them.

4. **Handle other non-link changes.** If the working tree has modified/untracked files outside `src/content/links/` and `public/images/`:
   - List them to the user.
   - Ask whether to include them in this commit or commit link files (and images) only.
   - Default to **link files + images only** if the user doesn't specify.

5. **Read each link file's frontmatter** (just the `title`) to build the commit message:
   - One file → subject: `Add link: <title>`
   - Multiple files → subject: `Add <N> link posts`, with a body listing each title as a bullet.

6. **Stage explicit paths.** Use `git add <path1> <path2> ...` — never `git add -A` or `git add .`.

7. **Commit** using a HEREDOC to preserve formatting. Include the Co-Authored-By trailer only if the commit was actually assembled by me (skip it if the user wrote the message themselves).

   ```
   git commit -m "$(cat <<'EOF'
   <subject>

   <optional body>

   Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
   EOF
   )"
   ```

8. **Push.** `git push origin main`. Do not force-push. If the push is rejected (non-fast-forward), stop and report — do not rebase/force automatically.

9. **Report.** Print:
   - The commit SHA (`git log -1 --format=%h`)
   - Live URL: `https://sted9000.github.io/weblog/`
   - "Deploy usually takes ~1 minute via GitHub Actions."

## Notes
- Never skip hooks (`--no-verify`) or bypass signing. If a commit hook fails, fix the cause and commit again — do not `--amend`.
- Do not touch files outside what the user approved in step 3.
