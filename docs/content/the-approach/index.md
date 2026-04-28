---
id: the-approach
title: "The Approach"
sidebar_position: 4
notion_id: 34d2e80c997d81c7b1c9de31918aaf0b
---
The migration methodology is built around one principle: you cannot plan what you cannot understand, and you cannot cut over what you have not validated. The four phases are ordered to enforce that discipline. Comprehension produces the knowledge graph. Planning uses the knowledge graph to build a migration sequence. Translation works through that sequence incrementally. Cutover follows translation one wave at a time.
Each phase produces artifacts that the next phase depends on. The knowledge graph feeds the wave plan. The wave plan defines the test cases needed before translation begins. Translation produces code that goes into parallel-run validation before any traffic shifts. Nothing is skipped, and no phase jumps ahead before the previous one is complete for the in-scope programs. Each phase below has a dedicated page with full detail.
[Phase 1: Comprehension](https://www.notion.so/34d2e80c997d81ec9742fcbcdfab3450) ingests the source estate, parses every file with a custom COBOL grammar, builds a dependency graph, identifies dead code, scores complexity, and generates LLM documentation for each program.
[Phase 2: Planning](https://www.notion.so/34d2e80c997d81deaa92f858bc338105) uses the knowledge graph to build a dependency-ordered wave plan, generates a regression test suite from production I/O, and confirms the target stack before any code changes happen.
[Phase 3: Incremental Translation](https://www.notion.so/34d2e80c997d81e0af0ee31caaa01a54) works through each wave, translating COBOL programs to the client's target stack with explicit handling for the patterns that cause silent failures, then running target and mainframe in parallel until outputs match.
[Phase 4: Cutover](https://www.notion.so/34d2e80c997d8117b0a4e283f21d2ae8) shifts traffic wave by wave once parallel-run validation passes, maintains mainframe fallback until confidence is high, and retires programs only after they have cleared all validation gates.
