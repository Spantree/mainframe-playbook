---
id: about-this-playbook
title: "About This Playbook"
sidebar_position: 1
notion_id: 3502e80c997d8135ac42c4021cb6aefe
---
This document is Trifork's informed hypothesis on AI-assisted mainframe modernization. It is partly a synthesis of established practice, partly a record of technical experiments we have run, and partly a hypothesis about how the full workflow should proceed. We are being explicit about which is which, because the honest version is more useful than an overconfident one.

The bottleneck in mainframe modernization is comprehension, not compute. Most legacy COBOL and NATURAL estates carry decades of business logic that was never documented, and the engineers who understood it are gone. The code runs production, but nobody can explain why it does what it does at the function level. That gap is what makes large-scale migration risky: you cannot safely transform what you do not understand.

## What we bring from our own experience

Trifork and Spantree have spent years on legacy modernization work that is not specifically about mainframes. We have rescued codebases that had outgrown their original architecture, migrated healthcare data platforms from aging on-premises systems to modern cloud infrastructure, and rebuilt legal technology search engines on new indexing architectures while preserving existing data and integrations. We have migrated financial trading platforms where correctness constraints were non-negotiable and downtime was not an option, and built payment processing infrastructure for organizations that needed to modernize without disrupting transaction flows.

The patterns that work in those contexts are the same patterns this playbook describes: comprehension before rewriting, incremental migration over big-bang replacement, parallel validation before cutover. Mainframe COBOL is a harder version of a problem we have solved in other forms.

## What is established by the broader industry

The comprehension-first methodology is validated by Anthropic's Code Modernization Playbook, by AWS's published work on mainframe modernization, and by the broader literature on legacy system analysis. The principle that you cannot migrate what you cannot understand is not speculative. The tooling to implement it at scale is now practical in a way it was not three years ago.

## What we have demonstrated

We ran a technical spike against the AWS CardDemo reference application, a realistic IBM z/OS COBOL corpus, to prove out the pipeline before recommending it. The spike completed the comprehension phase and produced analysis artifacts: inventory, complexity scores, dead code analysis, dependency graph, credential scan, and migration sequence. It also produced a partial TypeScript translation targeting a modern framework stack.

The translation covers the first migration wave: simple batch programs and core online controllers. It does not cover the full estate. The hardest programs are represented as annotated stubs that explain what specialist work they require. The translated code was reviewed by an independent AI pass, fixed, and verified by static analysis. The artifacts are open source in the [aws-mainframe-modernization-carddemo](https://github.com/Spantree/aws-mainframe-modernization-carddemo) repository.

## What is still hypothesis

We have not run this pipeline end-to-end on a production mainframe estate with millions of lines of code, 50 years of accumulated changes, and no prior documentation. The wave sequencing, the parallel-run validation approach, and the integration layer abstraction pattern are all informed by our experience and the research. The integration layer pattern specifically means that whatever middleware connects the mainframe to modern applications — MuleSoft, IBM API Connect, Apache Camel, or equivalent — stays in place as a stable API surface throughout migration, so consumer applications do not need to change until every program in their dependency chain has been translated.

The specific combination has not been applied to a mainframe estate of this complexity by this team. We are proposing to develop it together with the client.

## Who contributed to this

The methodology draws on Anthropic's Code Modernization Playbook, AWS's mainframe modernization documentation, Trifork's prior SAP and enterprise integration work in Europe and North America, Spantree's legacy modernization and code rescue projects, and the open source community work on tree-sitter grammars and ANTLR parsers for COBOL. The technical spike, the open source tooling, and this document were built by Spantree/Trifork.

## How to read this

The methodology section describes the approach as we understand it. The CardDemo spike section shows what that approach produced when applied to a real corpus. The technical reference covers the engineering details, the industry context covers the regulatory and market environment, and the competitive landscape covers how this compares to what the major vendors offer.

This is a living document. Treat it as a starting point for a conversation, not a finished recipe.
