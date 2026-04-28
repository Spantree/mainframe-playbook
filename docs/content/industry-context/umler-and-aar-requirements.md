---
id: umler-and-aar-requirements
title: "UMLER and AAR Requirements"
sidebar_position: 1
notion_id: 34d2e80c997d81f382e4f83c652aff9a
---
**UMLER (Universal Machine Language Equipment Register) is managed by Railinc on behalf of the AAR (Association of American Railroads).** It is the authoritative master file for North American rail equipment data, used for interchange, car hire billing, maintenance scheduling, and regulatory compliance.
**Railinc publishes a CSV bulk upload specification for UMLER transactions and Asset Management APIs for programmatic equipment create, update, delete, and query operations.** The Umler Data Specification Manual is publicly available at [public.railinc.com](http://public.railinc.com). The API documentation is at [public.railinc.com/developers/asset-management](http://public.railinc.com/developers/asset-management).
**The fleet owner is authoritative for physical attributes and reports updates to AAR via UMLER.** External shops can modify cars and report those changes back through UMLER, creating an inbound update path. This bidirectional relationship must be preserved exactly in the replacement system. The replacement system must handle both outbound attribute updates (fleet owner initiated) and inbound attribute updates (shop initiated, received from Railinc).
**FRA regulations at 49 CFR Part 215 and Part 238 govern freight car maintenance records, inspection intervals, and documentation.** Records must be retained for specified periods and must be available for FRA inspection. The replacement system must preserve auditable change histories and support long-term electronic retention. Any migration plan must confirm that the new system satisfies these requirements before the mainframe is decommissioned.
