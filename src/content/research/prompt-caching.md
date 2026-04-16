---
title: "Prompt caching windows"
date: 2026-03-30
tags: [ai, performance]
sources:
  - title: "Anthropic prompt caching"
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
---

The 5-minute TTL shapes a lot of downstream decisions. If you're polling or looping, choosing a delay under 5 minutes is cheap; crossing that boundary means re-reading the full context uncached.

Practical consequence: batch related calls within the window, and when you *must* wait longer, commit to waiting much longer so the cache miss is amortized.
