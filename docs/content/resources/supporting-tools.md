---
id: supporting-tools
title: "Supporting Tools"
sidebar_position: 4
---

The mainframe estate includes several supporting tools alongside the application code. Each requires its own migration plan.

Mainframe source control varies by shop. The most widely deployed is CA Endevor (Broadcom), followed by ChangeMan ZMF (Serena/Broadcom), Panvalet (Broadcom), and Librarian. The extraction approach is similar for all of them: bulk export, EBCDIC to ASCII conversion, and a single initial commit to Git, with changes tracked in Git from that point forward. The key differences are in the export tooling provided by each vendor. What is lost in every case is the full version history, change annotations, and member attributes. Common pitfalls regardless of source system include EBCDIC encoding conversion, fixed-width record format handling, and members that contain non-source artifacts.
File-AID (Broadcom) is used for data browsing, ad-hoc fixes, and file comparison in production. Post-migration equivalents are database tools (pgAdmin, DataGrip, psql) for the target relational database and standard file utilities for flat files. The transition period requires ensuring production support teams have equivalent capabilities before the mainframe programs retire.
SORT/DFSORT/ICETOOL handles high-volume data sorting, filtering, reformatting, and reporting in batch JCL. Simple sorts become SQL ORDER BY or Array.sort. ICETOOL-style data manipulation jobs become SQL queries or AWS Glue/Lambda batch functions. There is no single automated translator; each job must be analyzed individually.
BMC ControlM orchestrates batch job dependencies. ControlM has a cloud version that can orchestrate both mainframe and cloud workloads during a transition period. Post-migration alternatives include AWS Step Functions, Apache Airflow, and AWS EventBridge Scheduler. ControlM job definitions can be exported and partially mapped to these alternatives, with significant manual work typically required.
