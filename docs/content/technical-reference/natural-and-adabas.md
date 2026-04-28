---
id: natural-and-adabas
title: "NATURAL and ADABAS"
sidebar_position: 2
notion_id: 34d2e80c997d81cab02fd363969d7db6
---
NATURAL is Software AG's 4GL programming language. Unlike COBOL, where database access is handled via embedded SQL or file I/O statements, NATURAL database verbs (FIND, READ, STORE, UPDATE, DELETE, GET) are first-class language constructs woven directly into business logic. A typical NATURAL program reads: FIND EMPLOYEE WITH DEPARTMENT = #DEPT / READ EMPLOYEE. There is no separation of concerns between business logic and data access. This makes NATURAL harder to analyze and migrate than COBOL.
No public open-source parser exists for NATURAL. Targeted searches of public grammar collections (ANTLR grammars-v4, tree-sitter repositories) find no complete grammar. The Software AG Tech Community references a partial BNF, but practitioners report it is fragmentary and not sufficient for building a full parser. Building a production-quality tree-sitter or ANTLR grammar for NATURAL is a months-to-years investment, comparable to other complex 4GL grammars.
ADABAS is an inverted-list database with no SQL, no foreign keys, and no relational schema. The key structural concepts that must be mapped during migration:
- Descriptors (ADABAS indexed fields) map to SQL B-tree indexes in PostgreSQL
- ISN (internal sequence number) maps to a surrogate primary key
- MU (multiple-value) fields map to normalized child tables keyed by the root ISN
- PE (periodic group) fields map to child tables with an ordinal column to preserve ordering
- ADABAS file numbers map to table names, with the original number preserved in metadata for traceability
No mature open-source ETL tool handles ADABAS MU/PE semantics natively. The commercial options are tcVISION (Treehouse Software) and CONNX, both of which provide ADABAS-aware replication into PostgreSQL. Commercial migration factories (Astadia, IBM ModernSystems, Semantic Designs, BSM International) have proprietary parsers for NATURAL but do not publish them. Any engagement involving NATURAL must budget for either commissioning a migration factory or building a custom parser.
