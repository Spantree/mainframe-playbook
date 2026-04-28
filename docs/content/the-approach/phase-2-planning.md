---
id: phase-2-planning
title: "Phase 2: Planning"
sidebar_position: 2
notion_id: 34d2e80c997d81deaa92f858bc338105
---
![Phase 2: Planning](https://raw.githubusercontent.com/Spantree/tree-sitter-cobol-enterprise/main/docs/diagrams/mm-phase2.png)
Phase 2 turns the knowledge graph into an executable plan. Three things happen here in sequence: the migration order is determined, the regression test infrastructure is built, and the target stack is confirmed. These are not parallel tracks. Each one depends on the output of the one before it, and nothing in Phase 3 starts until all three are done.
The knowledge graph from Phase 1 contains everything needed to make these decisions with real data. Wave sequencing is derived from the dependency graph. Test coverage is driven by the program inventory. Stack selection is informed by the complexity scores and the integration surface analysis. Phase 2 is where that data gets turned into commitments.
:::note
**Dependency graph.** A directed graph where each node is a program or data artifact and each edge represents a dependency between them. A program that calls another program has an outgoing edge to that program. The graph determines migration order: a program cannot be migrated until everything it depends on has already been migrated. It also surfaces the blast radius of any change.
:::
## Build the wave plan
The wave plan sequences migration work into discrete, deployable batches called waves. Each wave is a set of programs that can be translated and deployed together because their upstream dependencies are already running in the target environment. A program cannot enter a wave until every program it depends on has already shipped.
The sequencing algorithm starts from leaf programs, those with no outgoing dependencies, and works inward toward the programs with the most business-critical logic and the most dependents. Programs are assigned to waves based on their depth in the [dependency graph](https://en.wikipedia.org/wiki/Dependency_graph) and their complexity scores. Low-complexity, low-coupling programs go first; high-complexity, high-coupling programs go last.

This ordering is deliberate: early waves are learning exercises. By the time the hardest programs are reached in later waves, the team has built translation patterns, tooling, and confidence on programs where mistakes are cheaper to fix.
## Capture regression test data
Before any code changes are made, production runs of each program are instrumented to capture input/output pairs. These pairs become the regression test suite that validates translation in Phase 3. The principle is simple: if the translated program produces the same outputs as the mainframe program for the same inputs, the translation is correct. No translation work starts on a program until that test suite exists.
For programs where no production data is available, whether because they handle edge cases that rarely fire or because they have not been run in years, manual specification work is required first. This is the same situation flagged at the end of Phase 1 for programs with no institutional knowledge. The test data capture step and the human review flag are two sides of the same problem: programs that are invisible to production instrumentation are also the programs whose behavior is hardest to verify after translation.
:::note
**TypeORM.** A TypeScript-native ORM (Object-Relational Mapper) that maps database tables to TypeScript classes and handles queries through a typed API. In this migration, COBOL copybook structures and ADABAS file definitions become TypeORM entities, and database access verbs (READ, FIND, STORE) become TypeORM repository methods.
:::
## Confirm the target stack
The target stack is confirmed in Phase 2, not assumed. The right answer is not the best technology in the abstract. It is the technology that the client's engineering team already builds and maintains, so that the migrated code can be owned by people who know the stack without needing a migration specialist to explain it.
For most modern enterprises, the default combination is TypeScript/NestJS for API and business logic, [TypeORM](https://typeorm.io/) for database access, PostgreSQL or Aurora as the relational database, and React for frontend. In the GATX engagement, the target is the Platform One stack: NestJS + Bun + TypeORM + React + TypeScript. Platform One was already running in production for other GATX applications before the migration started. That is the best possible outcome for a migration, because it means the migrated code lands in an environment the team already understands, with deployment pipelines and monitoring that already exist.


---

## In practice: CardDemo results

The [migration sequence](https://github.com/Spantree/aws-mainframe-modernization-carddemo/blob/migration/typescript/migration-analysis/migration-sequence.md) is an 8-wave plan ordered by dependency and complexity. Simple batch file readers come first, complex CICS financial transactions last, and two programs are flagged for manual rewrite rather than AI-assisted translation.

The [technology decisions](https://github.com/Spantree/aws-mainframe-modernization-carddemo/blob/migration/typescript/migration-analysis/technology-decisions.md) document explains the target stack selection: NestJS + Bun + TypeORM + PostgreSQL + React. It covers COMP-3 packed decimal handling with Decimal.js, the GO TO elimination strategy, BMS screen map to React component mapping, and the reasoning behind each choice.

The [risk matrix](https://github.com/Spantree/aws-mainframe-modernization-carddemo/blob/migration/typescript/migration-analysis/risk-matrix.md) and [POC plan](https://github.com/Spantree/aws-mainframe-modernization-carddemo/blob/migration/typescript/migration-analysis/poc-plan.md) cover the first wave in detail.
---
