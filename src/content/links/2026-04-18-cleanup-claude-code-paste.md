---
title: "Cleanup Claude Code Paste"
date: 2026-04-18
tags: [simon willison, claude-code, tools, raycast]
description: "Claude code fix formatting tools"
url: "https://tools.simonwillison.net/cleanup-claude-code-paste"
---

I was happy to find this tool by Simon Willison that solved a real annoyance: copy and pasting code from a terminal running Claude Code. The results are a mess. I found myself prompting claude to save the output to a file just so I didn't have to reformat things manually.

I liked this tool so much, but it was still a hassle to use Simon's web tool. So I turned the idea into a Raycast script. It reads the current content of the clipboard and pastes the cleaned up text with command + option + v

![Screenshot of the Raycast script](/weblog/images/2026-04-18-cleanup-claude-code-paste.png)
