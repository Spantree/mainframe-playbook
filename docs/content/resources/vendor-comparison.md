---
id: vendor-comparison
title: "Vendor Comparison"
sidebar_position: 6
---

**The mainframe modernization market has several established vendors and a growing number of AI-native entrants.**
IBM watsonx Code Assistant for Z is IBM's own AI-assisted migration product for z/OS workloads. It uses generative AI for code understanding and refactoring, and positions modernization as an integrated IBM-cloud program. The limitation is that it reinforces the IBM ecosystem. Organizations that want to exit IBM infrastructure and move to AWS with a TypeScript stack are not the target customer.
AWS BluAge (via AWS Transform for mainframe) produces Java/Spring Boot output from COBOL. In a benchmark run against the AWS CardDemo corpus, it generated 1,213 Java files. Those files require the proprietary BluAge (GapWalk) runtime from AWS and cannot be deployed without it. The generated Java is structurally COBOL: paragraphs become methods, working storage becomes context objects. It does not reflect actual Java idioms and requires developers familiar with the BluAge framework to maintain. AWS Transform produces output. We produce understanding. A third data point: AI-assisted translation of the same CardDemo corpus to NestJS produced a working first draft, but an independent AI review surfaced systematic issues (field name drift, financial arithmetic anti-patterns, business logic divergence in accumulation loops) that required a second pass before the code was correct. The process is comprehension-first, then AI translation, then AI review, then parallel validation. AWS Transform skips the comprehension and review steps, which is why the output requires their proprietary runtime and cannot be maintained without BluAge expertise.
Astadia is a specialist migration factory with automated COBOL and NATURAL/ADABAS modernization capabilities and published financial sector case studies. Their proprietary parsers are not public. The typical engagement model is fixed-price or time-and-materials with the migration factory doing the heavy lifting and handing off generated code.
Micro Focus / OpenText and Broadcom provide tools for COBOL analysis and partial modernization, primarily for rehosting to Linux while retaining COBOL. These are rehosting and replatforming tools, not true modernization. The code stays COBOL.
LzLabs runs COBOL binaries on commodity Linux without recompilation via a software-defined mainframe. This eliminates hardware cost but retains all the COBOL complexity and the institutional knowledge problem. It is cost reduction, not migration.
**The key advantages of the open-source TypeScript-native approach:**
- Portability: no proprietary runtime dependencies
- Target stack alignment: TypeScript/NestJS is what Platform One already uses
- Transparency: the analysis pipeline is auditable and reviewable by the client engineers
- MuleSoft compatibility: migration happens behind the existing MuleSoft API surface so consumer applications never change
The open-source grammar and analysis tools can be handed to the client team, not held as vendor IP.
