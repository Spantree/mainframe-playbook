---
id: cobol-parsing-our-approach
title: "COBOL Parsing - Our Approach"
sidebar_position: 1
notion_id: 34d2e80c997d8197813afbef12852476
---
IBM Enterprise COBOL on z/OS has a parsing problem most open-source tools do not solve: EXEC CICS and EXEC SQL blocks. Most parsers treat these as opaque text, producing ERROR nodes in the AST. This makes the resulting parse useless for any downstream analysis that cares about transaction behavior or database access.
We built a custom tree-sitter grammar that treats EXEC CICS and EXEC SQL as first-class typed nodes with named fields. A CICS READ command is not a bag of words; it has a DATASET, an INTO, a RIDFLD, and an optional RESP. That distinction matters when you are building a dependency graph or trying to understand what a program actually does.
The grammar handles IBM Enterprise COBOL fixed-form source (columns 1 to 80). All four divisions are covered. COPY/REPLACE directives, REDEFINES, PIC clause parsing including COMP-3 and packed decimal, nested programs, and CALL statements are all supported. The external C scanner handles column-position rules, comment lines, and continuation lines.
**Validation results against four corpora:**
- AWS CardDemo (66 files): 98.5% clean, 2 ERROR nodes
- NIST COBOL 85 (459 files): 6.3% clean. This suite tests features rarely used in enterprise z/OS shops.
- Legacy enterprise samples (62 files): 62.9% clean
- z Open Editor samples (9 files): 66.7% clean
**Known gaps:** WRITE AFTER ADVANCING has a GLR ambiguity in some edge cases. Intrinsic FUNCTION calls are partially supported. Free-form COBOL dialect is not supported.
**The grammar is MIT licensed and available at [https://github.com/Spantree/tree-sitter-cobol-enterprise](https://github.com/Spantree/tree-sitter-cobol-enterprise)****.** It derives from tree-sitter-cobol by Yutaro Sakamoto (also MIT). Both copyright notices are in the LICENSE file.
