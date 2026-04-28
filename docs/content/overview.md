---
id: overview
title: "Overview"
sidebar_position: 3
notion_id: 34d2e80c997d8157af2dd5924afc6fb7
---
The bottleneck in mainframe modernization is comprehension, not compute. Most legacy COBOL and NATURAL estates carry decades of business logic that was never documented, and the engineers who understood it are gone. The code runs production, but nobody can explain why it does what it does at the function level. That gap is what makes large-scale migration risky: you cannot safely transform what you do not understand.
What changed recently is that AI-assisted analysis is now mature enough to front-load the comprehension work before any translation begins. A custom tree-sitter grammar can parse IBM Enterprise COBOL into a structured AST, and LLMs can produce plain-English summaries of program intent at function and module level for programs in the 2,000-10,000 line range. The result is a knowledge graph of the estate: what each program does, what it calls, what data it reads and writes, and how complex it is.
The approach works in four phases: build the knowledge graph, build a wave plan from it, translate incrementally with parallel-run validation, and cut over wave by wave. Nothing is a big-bang migration. Each wave is a self-contained deployable unit, validated against the original system before any traffic shifts.
The technical differentiation comes from open-source tooling. The tree-sitter grammar for IBM Enterprise COBOL is MIT-licensed and published at [github.com/Spantree/tree-sitter-cobol-enterprise](http://github.com/Spantree/tree-sitter-cobol-enterprise). The target stack is TypeScript and NestJS, chosen because it is portable and well-understood, not because it requires a vendor runtime. MuleSoft stays in place as an abstraction layer throughout migration so consumer applications do not need to change until every program in their dependency chain has been translated.
