---
id: industry-context
title: "Industry Context"
sidebar_position: 5
---

Regulatory requirements and industry context for railcar fleet operators migrating mainframe systems.

## UMLER and AAR Requirements

UMLER (Universal Machine Language Equipment Register) is managed by Railinc on behalf of the AAR (Association of American Railroads). It is the authoritative master file for North American rail equipment data, used for interchange, car hire billing, maintenance scheduling, and regulatory compliance.
Railinc publishes a CSV bulk upload specification for UMLER transactions and Asset Management APIs for programmatic equipment create, update, delete, and query operations. The Umler Data Specification Manual is publicly available at [public.railinc.com](http://public.railinc.com). The API documentation is at [public.railinc.com/developers/asset-management](http://public.railinc.com/developers/asset-management).
The fleet owner is authoritative for physical attributes and reports updates to AAR via UMLER. External shops can modify cars and report those changes back through UMLER, creating an inbound update path. This bidirectional relationship must be preserved exactly in the replacement system. The replacement system must handle both outbound attribute updates (fleet owner initiated) and inbound attribute updates (shop initiated, received from Railinc).
FRA regulations at 49 CFR Part 215 and Part 238 govern freight car maintenance records, inspection intervals, and documentation. Records must be retained for specified periods and must be available for FRA inspection. The replacement system must preserve auditable change histories and support long-term electronic retention. Any migration plan must confirm that the new system satisfies these requirements before the mainframe is decommissioned.

## Comparable Rail IT Migrations

**Several North American rail industry participants have executed multi-year programs to replace mainframe and green-screen systems with cloud-hosted asset management and maintenance platforms.**
LTi Technology Solutions (ASPIRE platform) has worked with rail capital management companies on legacy modernization including Modern Rail Capital. The program combined process redesign, phased data migration, and API-driven integration with UMLER and shop portals. NTT Data documented a legacy modernization engagement with Trinity Industries, a major railcar manufacturer, involving asset management and maintenance tracking systems.
**The common pattern: phased migration with regulatory compliance as a constraint, bidirectional UMLER sync preserved throughout, shop portal integration maintained during transition, and multi-year timelines (typically two to five years for a full estate).**
The cost structure for mainframe migration has changed significantly with AI assistance. Large SI firms traditionally quote these programs as large-scale manual efforts with developer teams working from printed specifications. The AI-assisted approach front-loads comprehension work that previously required months of manual analysis, changing both the timeline and the cost structure.

## UMLER and AAR Requirements

**UMLER (Universal Machine Language Equipment Register) is managed by Railinc on behalf of the AAR (Association of American Railroads).** It is the authoritative master file for North American rail equipment data, used for interchange, car hire billing, maintenance scheduling, and regulatory compliance.
**Railinc publishes a CSV bulk upload specification for UMLER transactions and Asset Management APIs for programmatic equipment create, update, delete, and query operations.** The Umler Data Specification Manual is publicly available at [public.railinc.com](http://public.railinc.com). The API documentation is at [public.railinc.com/developers/asset-management](http://public.railinc.com/developers/asset-management).
**The fleet owner is authoritative for physical attributes and reports updates to AAR via UMLER.** External shops can modify cars and report those changes back through UMLER, creating an inbound update path. This bidirectional relationship must be preserved exactly in the replacement system. The replacement system must handle both outbound attribute updates (fleet owner initiated) and inbound attribute updates (shop initiated, received from Railinc).
**FRA regulations at 49 CFR Part 215 and Part 238 govern freight car maintenance records, inspection intervals, and documentation.** Records must be retained for specified periods and must be available for FRA inspection. The replacement system must preserve auditable change histories and support long-term electronic retention. Any migration plan must confirm that the new system satisfies these requirements before the mainframe is decommissioned.

## Comparable Rail IT Migrations

**Several North American rail industry participants have executed multi-year programs to replace mainframe and green-screen systems with cloud-hosted asset management and maintenance platforms.**
**LTi Technology Solutions (ASPIRE platform) has worked with rail capital management companies on legacy modernization including Modern Rail Capital.** The program combined process redesign, phased data migration, and API-driven integration with UMLER and shop portals. NTT Data documented a legacy modernization engagement with Trinity Industries, a major railcar manufacturer, involving asset management and maintenance tracking systems.
**The common pattern: phased migration with regulatory compliance as a constraint, bidirectional UMLER sync preserved throughout, shop portal integration maintained during transition, and multi-year timelines (typically two to five years for a full estate).**
**The cost structure for mainframe migration has changed significantly with AI assistance.** Large SI firms traditionally quote these programs as large-scale manual efforts with developer teams working from printed specifications. The AI-assisted approach front-loads comprehension work that previously required months of manual analysis, changing both the timeline and the cost structure.
