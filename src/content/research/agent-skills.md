---
title: "Agent skills: first notes"
date: 2026-04-12
tags: [ai, agents, learning]
description: "Working notes on Claude Agent skills."
sources:
  - title: "Claude Agent SDK docs"
    url: "https://docs.anthropic.com/en/docs/claude-code/sub-agents"
---

Skills are discoverable, named capabilities an agent can invoke on demand. The mental model I'm converging on:

- A skill is a bundle of instructions + (optionally) scripts the agent can lean on.
- The agent only loads the full skill contents when it decides the skill is relevant, keeping the default context small.
- This is essentially deferred tool loading for instruction-shaped capabilities.

I want to track my own experiments with skills as a research thread here.
