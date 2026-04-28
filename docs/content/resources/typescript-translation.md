---
id: typescript-translation
title: "TypeScript Translation"
sidebar_position: 2
---

Translating COBOL or NATURAL to TypeScript/NestJS requires a hybrid pipeline: parser-driven schema conversion, LLM-assisted business logic translation, and a regression test harness that compares legacy system outputs to translated outputs.

The paradigm shift from COBOL/NATURAL to NestJS is not syntactic but architectural. COBOL and NATURAL are procedural, with database access woven into the flow. NestJS expects separation of concerns: a service layer for business logic and a TypeORM repository for data access. The migration pattern isolates database verbs into TypeORM repositories and translates procedural control flow into service methods.

Several translation challenges recur across programs. COMP-3 packed decimal fields must become TypeScript numbers with explicit decimal handling or Decimal.js, not native floating-point; any program that does financial math fails silently if this step is skipped. GO TO elimination requires control flow analysis to reconstruct loops and conditionals. The binary-parser and fixed-width-parser npm packages handle low-level binary format issues. NATURAL READ loops (implicit record traversal) become explicit TypeORM find calls with cursor or batch APIs.

LLM assistance is effective for generating plain-English intent summaries at the function level (which become JSDoc comments), restructuring 200-300 line mechanically translated functions into idiomatic NestJS service methods, and flagging translation decisions that require human review. LLMs are not reliable for handling domain-specific business rules that rely on undocumented behavior, resolving edge cases in packed decimal arithmetic, or making GO TO elimination decisions in programs with deeply nested branching.

The regression test suite is built before translation begins. Input/output pairs are captured from production runs on the legacy system. After translation, the TypeScript service is invoked with the same inputs and outputs are compared. This is the only reliable way to validate correctness for programs with undocumented business rules.
## What the review found
An independent code review of the CardDemo TypeScript translation surfaced three recurring failure modes that apply to any AI-generated COBOL migration.

Field name drift is the most common. AI translation tends to preserve COBOL-style naming in controller and service code while the entity layer uses idiomatic TypeScript property names. The mismatch compiles silently in loosely typed code but fails at runtime. TypeScript strict mode catches most instances, but a global property-name audit against the entity definitions is a necessary step after any AI translation pass.

Financial arithmetic anti-patterns appear when AI translation defaults to native JavaScript `parseFloat()` for fields that are COMP-3 in COBOL. This violates the Decimal.js contract the translation pipeline establishes. The result is IEEE-754 rounding on financial calculations, incorrect at the cent level in edge cases and undetectable without parallel-run comparison against mainframe output.

Business logic divergence in accumulation loops is the hardest to catch. COBOL programs often accumulate values across a record set and write a single output on the account boundary. AI translation frequently converts this to per-record writes, producing the correct total only when there is one record per account. The divergence is invisible in unit tests that do not mirror the COBOL multi-record test cases, but will surface immediately in parallel-run output comparison.

All three failure modes are precisely what parallel-run validation detects. The review step between translation and parallel run reduces the number of iteration rounds needed by catching systematic issues before the first run.
