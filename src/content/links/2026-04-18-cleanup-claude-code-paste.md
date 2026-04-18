---
title: "Cleanup Claude Code Paste"
date: 2026-04-18
tags: [simon willison, claude-code, tools]
description: "Tool to remove the ❯ prompt, fix wrapped-line whitespace, and join lines into clean text from terminal output."
url: "https://tools.simonwillison.net/cleanup-claude-code-paste"
---

> Simplicity is prerequisite for reliability.

One of those tiny utilities that solves a real, niche annoyance. When you paste a transcript out of a terminal running Claude Code, you end up with a mess: the `❯` prompt character in front of every command, ragged whitespace where long lines wrapped, and stray line breaks mid-sentence that make the whole thing unreadable in anything that isn't a terminal.

Simon's tool does exactly one thing: it strips that noise and gives you back clean, joined text you can paste into a blog post, a bug report, or a Slack message without hand-editing every line.

![Screenshot of the Cleanup Claude Code Paste tool](https://placehold.co/800x450/1f2937/e5e7eb?text=Cleanup+Claude+Code+Paste)

Single-purpose tools like this are my favorite genre of web utility — no sign-up, no tracking, no "premium tier," just a textarea and a button that does the job.
